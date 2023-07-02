import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

const DIARY_DATA = [
  {
    title: "타이틀",
    content: "컨텐츠",
    location: "프랑스",
    thumbnail: "https://eliceproject.s3.ap-northeast-2.amazonaws.com/dongs.png",
    isHidden: false,
    date: "2023-07-02",
  },
];

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");
  const [diaryData, setDiaryData] = useState<Diary[]>([]);

  const fetchData = (cateogry: string) => {
    if (selectedCategory === "전체보기") {
      // 전체일기 axios
    }
    // 카테고리 axios 요청
    setDiaryData(diaryData);
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Profile variant="myPage" user={USER_DATA} onPress={() => alert("gd")} />
      <Category
        category={CATEGORY_DATA}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DiaryList diary={diaryData} />
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
