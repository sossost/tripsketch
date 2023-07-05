import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

const Comment = () => {
  return (
    <View style={CommonStyles.appContainer}>
      <CommentList />
      <CommentInput />
    </View>
  );
};

export default Comment;
