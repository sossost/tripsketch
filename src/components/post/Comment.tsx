import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

const Comment = () => {
  return (
    <View style={[CommonStyles.appContainer, styles.container]}>
      <CommentList />
      <CommentInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default Comment;
