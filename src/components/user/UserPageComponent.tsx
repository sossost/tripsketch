import { useCallback, useEffect } from "react";
import { styled } from "styled-components/native";
import { useGetPostsByNickname } from "../../hooks/usePostQuery";
import {
  useGetCurrentUser,
  useGetUserByNickname,
} from "../../hooks/useUserQuery";
import { Post } from "../../types/Post";
import { useRecoilState } from "recoil";
import { categoryState } from "../../store/categoryAtom";
import { errorToastMessage } from "../../utils/toastMessage";

import Profile from "./profile/Profile";
import CategoryList from "./category/CategoryList";
import Spacing from "../UI/header/Spacing";
import PostCard from "../post/card/PostCard";
import NonePosts from "../post/NonePosts";
import ProfileSkeletonUI from "./profile/ProfileSkeletonUI";
import CategorySkeletonUI from "./category/CategorySkeletonUI";
import AsyncBoundary from "../common/AsyncBoundary";
import Loading from "../UI/Loading";

interface UserPageComponentProps {
  pageOwnerNickname?: string;
}

/**
 * @description : 유저 페이지 컴포넌트
 *
 * @param pageOwnerNickname : 해당 페이지 주인의 닉네임
 * @param variant : 페이지 종류 (마이페이지, 유저페이지)
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.2.3, 유저 페이지 컴포넌트 각 비즈니스 로직 분리
 * @see None,
 */
const UserPageComponent = ({ pageOwnerNickname }: UserPageComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);
  // 현재 로그인한 유저 정보를 가져옴
  const currentUser = useGetCurrentUser();

  // 닉네임이 있으면 해당 유저의 정보를 가져오고, 없으면 현재 로그인한 유저의 정보를 할당
  const pageOwner = pageOwnerNickname
    ? useGetUserByNickname(pageOwnerNickname)
    : currentUser;

  // 닉네임을 통해 해당 유저의 게시글을 가져옴
  const { posts, hasNextPage, fetchNextPage, postsIsLoading } =
    useGetPostsByNickname(pageOwner.data?.nickname, selectedCategory);

  /** 스크롤 끝까지 내렸을때 다음페이지 패치하는 핸들러 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  if (pageOwner.isError) {
    errorToastMessage("유저 정보를 가져오는데 실패했습니다.");
    return null;
  }

  // 유저 페이지 변경시 카테고리 초기화
  useEffect(() => {
    setSelectedCategory("전체보기");
  }, [pageOwnerNickname]);

  return (
    <AsyncBoundary>
      <UserPageLayout
        data={posts}
        renderItem={({ item }) => {
          return <PostCard key={(item as Post).id} post={item as Post} />;
        }}
        alwaysBounceVertical={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={() => {
          return (
            <>
              <AsyncBoundary suspenseFallback={<ProfileSkeletonUI />}>
                <Profile
                  nickname={pageOwnerNickname || currentUser.data!.nickname}
                />
              </AsyncBoundary>

              <Spacing direction="vertical" size={15} />

              <AsyncBoundary suspenseFallback={<CategorySkeletonUI />}>
                <CategoryList
                  nickname={pageOwnerNickname || currentUser.data!.nickname}
                />
              </AsyncBoundary>

              <Spacing direction="vertical" size={15} />

              {postsIsLoading && <Loading />}
              {!postsIsLoading && posts.length === 0 && <NonePosts />}
            </>
          );
        }}
      />
    </AsyncBoundary>
  );
};

export default UserPageComponent;

const UserPageLayout = styled.FlatList`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  gap: 20px;
  background-color: white;
`;
