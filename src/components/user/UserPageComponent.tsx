import { useEffect } from "react";
import { styled } from "styled-components/native";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import { useRecoilState } from "recoil";
import { categoryState } from "../../store/categoryAtom";

import Profile from "./profile/Profile";
import CategoryList from "./category/CategoryList";
import AsyncBoundary from "../common/AsyncBoundary";
import UserPostList from "./post/UserPostList";
import Header from "../UI/header/Header";
import Title from "../UI/header/Title";
import CommonHeaderLeft from "../UI/header/HeaderLeft";

interface UserPageComponentProps {
  nickname?: string;
}

/**
 * @description : 유저 페이지 컴포넌트
 *
 * @param nickname : 해당 페이지 주인의 닉네임
 * @param variant : 페이지 종류 (마이페이지, 유저페이지)
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.4.0, 유저페이지 리팩토링
 * @see None,
 */
const UserPageComponent = ({ nickname }: UserPageComponentProps) => {
  // 페이지 별로 헤더 왼쪽에 들어갈 컴포넌트를 다르게 렌더링
  const HeaderChildren = nickname ? (
    <CommonHeaderLeft title={nickname} />
  ) : (
    <Title title={"마이페이지"} />
  );

  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);
  // 현재 로그인한 유저 정보를 가져옴
  const currentUser = useGetCurrentUser();
  // 현재 페이지 주인의 닉네임 (마이페이지면 현재 로그인한 유저의 닉네임)
  const pageOwnerNickname = nickname || currentUser.data!.nickname;

  // 유저 페이지 변경시 카테고리 초기화
  useEffect(() => {
    setSelectedCategory("전체보기");
  }, [pageOwnerNickname]);

  return (
    <AsyncBoundary>
      <Header left={HeaderChildren} />
      <UserPageLayout
        data={null}
        renderItem={null}
        ListHeaderComponent={() => (
          <UserPageContainer>
            <Profile nickname={pageOwnerNickname} />
            <CategoryList nickname={pageOwnerNickname} />
            <AsyncBoundary>
              <UserPostList
                nickname={pageOwnerNickname}
                category={selectedCategory}
              />
            </AsyncBoundary>
          </UserPageContainer>
        )}
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

const UserPageContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
