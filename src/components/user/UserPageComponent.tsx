import { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import { FlatList } from "react-native";

import Profile from "@components/user/profile/Profile";
import UserPostList from "@components/user/post/UserPostList";
import CategoryList from "@components/user/category/CategoryList";
import HamburgerBtn from "@components/user/profile/HamburgerBtn";
import AsyncBoundary from "@components/common/AsyncBoundary";
import PageLayout from "@components/common/PageLayout";
import Header from "@components/UI/header/Header";
import Title from "@components/UI/header/Title";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";

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
 * @update : 2023-09-20,
 * @version 1.4.3, 카테고리 전역상태로 관리시 유저페이지, 마이페이지 카테고리 상태가 꼬이는 문제 해결
 * @see None,
 */
const UserPageComponent = ({ nickname }: UserPageComponentProps) => {
  // 현재 유저페이지의 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState("전체보기");

  // 현재 로그인한 유저 정보를 가져옴
  const { data: currentUser } = useGetCurrentUser();

  // 현재 페이지 주인의 닉네임 (마이페이지면 현재 로그인한 유저의 닉네임)
  const pageOwnerNickname = nickname || currentUser!.nickname;

  // 현재 페이지가 마이페이지인지 확인
  const isMypage = pageOwnerNickname === currentUser?.nickname;

  // 페이지 별로 헤더 왼쪽에 들어갈 컴포넌트를 다르게 렌더링
  const LeftHeaderChildren = isMypage ? (
    <Title title={pageOwnerNickname} />
  ) : (
    <CommonHeaderLeft title={pageOwnerNickname} />
  );

  // 유저 페이지 변경시 카테고리 초기화
  useEffect(() => {
    setSelectedCategory("전체보기");
  }, [pageOwnerNickname]);

  return (
    <AsyncBoundary>
      <PageLayout>
        <Header
          left={LeftHeaderChildren}
          right={isMypage && <HamburgerBtn />}
        />
        <FlatList
          data={null}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 2,
          }}
          ListHeaderComponent={() => (
            <UserPageContainer>
              <Profile nickname={pageOwnerNickname} />
              <CategoryList
                nickname={pageOwnerNickname}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <UserPostList
                nickname={pageOwnerNickname}
                category={selectedCategory}
              />
            </UserPageContainer>
          )}
        />
      </PageLayout>
    </AsyncBoundary>
  );
};

export default UserPageComponent;

const UserPageContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
