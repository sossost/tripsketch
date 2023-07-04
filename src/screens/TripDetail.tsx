import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import Comment from "../components/post/Comment";
import PostView from "../components/post/PostView";

const TripDetail = () => {
  return (
    <View style={CommonStyles.appContainer}>
      <PostView />
      <Comment />
    </View>
  );
};

const styles = StyleSheet.create({});
export default TripDetail;
