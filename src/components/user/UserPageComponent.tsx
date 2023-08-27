import React, { useState } from "react";
import { styled } from "styled-components/native";
import { category } from "../../../data/mockdata";
import { useGetPostsByNickname } from "../../hooks/usePostQuery";
import {
  useGetCurrentUser,
  useGetSocialList,
  useGetUserByNickname,
  useSocialController,
} from "../../hooks/useUserQuery";
import { User } from "../../types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";

import Profile from "./profile/Profile";
import Category from "./category/Category";
import UserPageSkeletonUI from "./UserPageSkeletonUI";
import PostList from "../post/PostList";

interface UserPageComponentProps {
  nickname?: string;
  variant: "myPage" | "userPage";
}

const UserPageComponent = ({ nickname, variant }: UserPageComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");

  // 현재 로그인한 유저 정보를 가져옴
  const currentUser = useGetCurrentUser();

  // 닉네임이 있으면 해당 유저의 정보를 가져오고, 없으면 현재 로그인한 유저의 정보를 할당
  const user = nickname ? useGetUserByNickname(nickname) : currentUser;

  // 로그인한 유저정보를 통해 팔로잉 리스트를 가져옴
  const currentUserFollowingList = useGetSocialList(
    "팔로잉",
    currentUser.data?.nickname
  ).data;

  // 현재 로그인한 유저가 해당 유저를 팔로잉하고 있는지 확인
  const isFollowing =
    currentUserFollowingList?.some(
      (following: User) => following.nickname === user.data?.nickname
    ) || false;

  // 리액트 쿼리 뮤테이션 처리한 팔로우 버튼 핸들러
  const followBtnHandler = useSocialController(currentUser.data);

  // 마이페이지 인경우 프로필 편집 페이지로 이동, 유저페이지 인경우 팔로우 버튼 핸들러 실행
  const handleButtonClick = () => {
    if (variant === "myPage") {
      navigation.navigate("EditProfilePage");
    } else {
      followBtnHandler(user.data!.nickname, isFollowing);
    }
  };

  // 닉네임을 통해 해당 유저의 게시글을 가져옴
  const posts = useGetPostsByNickname(user.data!.nickname, selectedCategory);

  // 유저데이터 상태에 따라 UI 분기처리
  if (user.isLoading) {
    return <UserPageSkeletonUI />;
  }

  if (user.isError) {
    return <UserPageSkeletonUI />;
  }

  if (!user.data) {
    return <UserPageSkeletonUI />;
  }

  return (
    <UserPageLayout>
      <Profile
        variant={variant}
        user={user.data}
        onPress={handleButtonClick}
        isFollowing={isFollowing}
      />

      <Category
        categoryList={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <PostList posts={posts.data} /> */}
    </UserPageLayout>
  );
};

export default UserPageComponent;

export const UserPageLayout = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  gap: 20px;
  background-color: white;
`;
