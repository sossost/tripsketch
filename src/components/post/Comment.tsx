import { StyleSheet, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";
import Toast from "react-native-toast-message";
import {
  getCreateComment,
  getCreateReplyComment,
  getUpdateCommentLike,
} from "../../hooks/useCommentQuery";

const Comment = () => {
  const createCommentMutation = getCreateComment();
  const queryClient = useQueryClient();

  const handleSubmit = async (comment: String) => {
    try {
      const commentData = {
        tripId: "1234",
        content: comment,
      };
      await createCommentMutation.mutateAsync(commentData);
      Toast.show({ type: "success", text1: "댓글 생성이 완료되었습니다." });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 생성을 실패하였습니다." });
    }
  };

  const createReplyCommentMutation = getCreateReplyComment();
  const handleReplyCommentSubmit = async (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => {
    try {
      const commentData = {
        tripId: "1234",
        content: comment,
        replyToNickname: replyToNickname,
        parentId: parentId,
      };
      await createReplyCommentMutation.mutateAsync(commentData);
      Toast.show({ type: "success", text1: "댓글 생성이 완료되었습니다." });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 생성을 실패하였습니다." });
    }
  };

  // const isLikeCommentMutation = getUpdateCommentLike();
  // const isLikeComment = async (isLikeComment) => {
  //   try {
  //     await isLikeCommentMutation.mutateAsync(isLikeComment);
  //   } catch (error) {
  //     console.error("오류 발생:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <CommentList sort={"all"} onReplySubmit={handleReplyCommentSubmit} />
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
