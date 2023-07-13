import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import SplashBack from "../components/common/SplashBack";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>메인 화면입니다.</Text>
      <KakaoLoginButton />
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
