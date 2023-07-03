import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/common/CustomButton";

const Login = () => {
  const LoginButtonHandler = () => {
    // 버튼이 눌렸을 때 수행할 작업을 정의합니다.
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <CustomButton
        color="blue"
        buttonText="로그인"
        onPress={LoginButtonHandler}
      />
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

export default Login;
