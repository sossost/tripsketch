import { useEffect } from "react";
import { styled } from "styled-components/native";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import { useRecoilState } from "recoil";
import { categoryState } from "../../store/categoryAtom";
import { FlatList } from "react-native";

import Profile from "./profile/Profile";
import CategoryList from "./category/CategoryList";
import AsyncBoundary from "../common/AsyncBoundary";
import UserPostList from "./post/UserPostList";
import Header from "../UI/header/Header";
import Title from "../UI/header/Title";
import CommonHeaderLeft from "../UI/header/HeaderLeft";
import PageLayout from "../common/PageLayout";

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
      <PageLayout>
        <Header left={HeaderChildren} />
        <FlatList
          data={null}
          renderItem={null}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
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
      </PageLayout>
    </AsyncBoundary>
  );
};

export default UserPageComponent;

const UserPageContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
