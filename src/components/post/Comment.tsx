import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

const Comment = () => {
  return (
    <View style={styles.container}>
      <CommentList />
      <CommentInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default Comment;
