import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import SplashBack from "../components/common/SplashBack";

const Home = ({ navigation }: any) => {
  /** 로그인 페이지 이동 핸들러 */
  const loginMoveHandler = () => {
    navigation.navigate("Login");
  };

  /** 회원가입 페이지 이동 핸들러 */
  const SignUpMoveHandler = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text>메인 화면입니다.</Text>
      <SplashBack willFadeOut={false} />

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
