import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import SplashBack from "../components/common/SplashBack";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import PostCard from "../components/post/card/PostCard";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>메인 화면입니다.</Text>
      <KakaoLoginButton />
      <PostCard />

      {/* 로그인 페이지 구현용 임시 연결 버튼 */}
      <Button title="로그인" onPress={loginMoveHandler} />

      {/* 회원가입 페이지 구현용 임시 연결 버튼 */}
      <Button title="회원가입" onPress={SignUpMoveHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
