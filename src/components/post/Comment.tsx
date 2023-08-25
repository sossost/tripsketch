import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";
import { getCreateComment } from "../../hooks/useCommentQuery";

const Comment = () => {
  const createCommentMutation = getCreateComment();
  const queryClient = useQueryClient();

  const handleSubmit = async (comment: String) => {
    try {
      const commentData = {
        tripId: "1234",
        content: comment,
        parentId: "",
        replyTo: "",
      };
      const createdComment = await createCommentMutation.mutateAsync(
        commentData
      );
      queryClient.invalidateQueries(["comment"]);
      console.log("댓글이 성공적으로 생성되었습니다.", createdComment);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CommentList sort={"all"} />
      <View style={CommonStyles.appContainer}>
        <CommentInput onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default Comment;
