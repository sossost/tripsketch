import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getDiariesByCategory } from "../services/diary";
import { useNavigation } from "@react-navigation/native";

import Profile from "../components/user/Profile";
import Category from "../components/user/Category";
import DiaryList from "../components/user/DiaryList";

const USER_DATA = {
  id: "elice_official",
  profile_img: "https://eliceproject.s3.ap-northeast-2.amazonaws.com/dongs.png",
  followers: ["나", "너", "우리"],
  followings: ["너", "그", "그녀"],
  user_name: "엘리스",
  introduction: "프로필 불라불라 어쩌구저쩌구",
};

const CATEGORY_DATA = ["프랑스", "독일", "이탈리아"];
CATEGORY_DATA.unshift("전체보기");

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");
  const {
    data: diaries,
    isLoading,
    isError,
  } = useQuery(["diaries", selectedCategory], () =>
    getDiariesByCategory(selectedCategory)
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Profile
        variant="myPage"
        user={USER_DATA}
        onPress={() => console.log("ㅎㅇ")}
      />
      <Category
        category={CATEGORY_DATA}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DiaryList diaries={diaries} isLoading={isLoading} isError={isError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
  },
});
export default MyPage;
