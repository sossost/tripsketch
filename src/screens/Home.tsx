import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import SplashBack from "../components/common/SplashBack";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import PostCard from "../components/post/card/PostCard";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    color: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default Home;
