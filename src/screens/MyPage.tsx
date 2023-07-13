import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getDiariesByCategory } from "../services/diary";
// import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: "#ffffff",
  },
});
export default MyPage;
