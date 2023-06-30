import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const TripList = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>여행 리스트입니다.</Text>
      <Button
        title="Go to Mypage"
        onPress={() => navigation.navigate("TripDetail")}
      />
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
export default TripList;
