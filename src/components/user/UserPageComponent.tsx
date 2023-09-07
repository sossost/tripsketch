import React, { Suspense, useCallback, useState } from "react";
import { styled } from "styled-components/native";
import { category } from "../../../data/mockdata";
import { useGetPostsByNickname } from "../../hooks/usePostQuery";
import {
  useGetCurrentUser,
  useGetSocialList,
  useGetUserByNickname,
} from "../../hooks/useUserQuery";
import { User } from "../../types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { Post } from "../../types/Post";
import { useSocialControllerInUserPage } from "../../hooks/useFollowQuery";
import { LINK } from "../../constants/link";

import Profile from "./profile/Profile";
import Category from "./category/Category";
import UserPageSkeletonUI from "./UserPageSkeletonUI";
import Spacing from "../UI/header/Spacing";
import PostCard from "../post/card/PostCard";
import { useGetCategoriesByNickname } from "../../hooks/useCategoryQuery";

interface UserPageComponentProps {
  pageOwnerNickname?: string;
  variant: "myPage" | "userPage";
}

const UserPageComponent = ({
  pageOwnerNickname,
  variant,
}: UserPageComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");

  // 현재 로그인한 유저 정보를 가져옴
  const currentUser = useGetCurrentUser();

  // 닉네임이 있으면 해당 유저의 정보를 가져오고, 없으면 현재 로그인한 유저의 정보를 할당
  const pageOwner = pageOwnerNickname
    ? useGetUserByNickname(pageOwnerNickname)
    : currentUser;

  // 닉네임을 통해 해당 유저의 카테고리를 가져옴
  const categoryList = useGetCategoriesByNickname(pageOwner.data!.nickname);

  // 로그인한 유저정보를 통해 팔로잉 리스트를 가져옴
  const currentUserFollowingList =
    currentUser.data &&
    useGetSocialList("팔로잉", currentUser.data.nickname).data;

  // 현재 로그인한 유저가 해당 유저를 팔로잉하고 있는지 확인
  const isFollowing =
    currentUserFollowingList?.some(
      (following: User) => following.nickname === pageOwner.data?.nickname
    ) || false;

  /** 팔로우 버튼 핸들러 */
  const handleFollowBtn = useSocialControllerInUserPage({
    currentUser: currentUser.data,
    pageOwner: pageOwner.data!,
  });

  // 마이페이지 인경우 프로필 편집 페이지로 이동, 유저페이지 인경우 팔로우 버튼 핸들러 실행
  const handleButtonClick = () => {
    if (variant === "myPage") {
      navigation.navigate(LINK.EDIT_PROFILE_PAGE);
    } else {
      handleFollowBtn(isFollowing);
    }
  };

  // 닉네임을 통해 해당 유저의 게시글을 가져옴
  const { posts, hasNextPage, fetchNextPage } = useGetPostsByNickname(
    pageOwner.data!.nickname,
    selectedCategory
  );

  /** 스크롤 끝까지 내렸을때 다음페이지 패치하는 핸들러 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <UserPageLayout
      data={posts}
      renderItem={({ item }) => {
        return <PostCard key={(item as Post).id} post={item as Post} />;
      }}
      alwaysBounceVertical={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={() => {
        // 유저데이터 상태에 따라 UI 분기처리
        if (!pageOwner.data || !categoryList.data) {
          return <UserPageSkeletonUI />;
        }
        return (
          <>
            <Profile
              variant={variant}
              user={pageOwner.data}
              onPress={handleButtonClick}
              isFollowing={isFollowing}
            />

            <Spacing direction="vertical" size={15} />

            <Category
              categoryList={categoryList.data}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <Spacing direction="vertical" size={15} />
          </>
        );
      }}
    />
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
