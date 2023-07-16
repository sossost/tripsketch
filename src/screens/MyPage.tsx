import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getDiariesByCategory } from "../services/diary";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";

import Profile from "../components/user/Profile";
import Category from "../components/user/Category";
import DiaryList from "../components/user/DiaryList";

import { category, currentUser } from "../../data/mockdata";



const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");
  const {
    data: diaries,
    isLoading,
    isError,
  } = useQuery(["diaries", selectedCategory], () =>
    getDiariesByCategory(selectedCategory)
  );

  // const navigation = useNavigation();

  return (
    <Layout>
      <Profile
        variant="myPage"
        user={currentUser}
        onPress={() => console.log("ㅎㅇ")}
      />
      <Category
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DiaryList diaries={diaries} isLoading={isLoading} isError={isError} />
    </Layout>
  );
};

const Layout = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  gap: 20px;
  background-color: white;
`;

export default MyPage;
