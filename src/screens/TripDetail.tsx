import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Comment from "../components/post/Comment";
import PostView from "../components/post/PostView";
import Line from "../components/common/Line";

const TripDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <PostView />
      <Line />
      <Comment />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default TripDetail;
