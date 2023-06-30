import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TripDetail = () => {
  return (
    <View style={styles.container}>
      <Text>상세페이지 입니다.</Text>
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
export default TripDetail;
