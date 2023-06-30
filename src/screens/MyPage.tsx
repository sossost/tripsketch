import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const MyPage = () => {
  return (
    <View style={styles.container}>
      <Text>MyPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MyPage;
