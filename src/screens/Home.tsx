import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Mypage"
        onPress={() => navigation.navigate("MyPage")}
      />
      <Text>메인 화면입니다.</Text>
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
