import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { category } from "../../data/mockdata";
import { Text, TouchableOpacity } from "react-native";
import { useGetDiariesByCategory } from "../hooks/usePostQuery";
import { useGetCurrentUser } from "../hooks/useUserQuery";
import { UserPageLayout } from "./UserPage";
import { StackNavigation } from "../types/RootStack";

import Profile from "../components/user/profile/Profile";
import Category from "../components/user/Category";
import DiaryList from "../components/user/DiaryList";
import UserPageSkeletonUI from "../components/user/UserPageSkeletonUI";

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");

  const navigation = useNavigation<StackNavigation>();

  const currentUser = useGetCurrentUser();

  if (currentUser.isLoading) {
    return <UserPageSkeletonUI />;
  }

  if (currentUser.isError) {
    return <UserPageSkeletonUI />;
  }

  if (!currentUser.data) {
    navigation.navigate("KakaoLoginPage");
    return <UserPageSkeletonUI />;
  }

  const nickname = currentUser.data.nickname ?? "";
  // const diaries = useGetDiariesByCategory(nickname, selectedCategory) ?? [];

  return (
    <MyPageLayout>
      <Profile
        variant={"myPage"}
        user={currentUser.data}
        onPress={() => navigation.navigate("EditProfilePage")}
      />

      <Category
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <DiaryList diaries={diaries.data} /> */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UserPage", {
            nickname: "네이버",
          })
        }
      >
        <Text>유저버튼</Text>
      </TouchableOpacity>
    </MyPageLayout>
  );
};

const MyPageLayout = styled(UserPageLayout)``;

export default MyPage;
