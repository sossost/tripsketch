import { StyleSheet, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";
import Toast from "react-native-toast-message";
import { getCreateComment } from "../../hooks/useCommentQuery";
import { getUpdateCommentLike } from "../../hooks/useCommentQuery";

const Comment = () => {
  const createCommentMutation = getCreateComment();
  const queryClient = useQueryClient();

  const handleSubmit = async (comment: String, parentId?: String) => {
    try {
      const commentData = {
        tripId: "1234",
        content: comment,
        parentId: parentId,
        replyTo: "",
      };
      await createCommentMutation.mutateAsync(commentData);
      Toast.show({ type: "success", text1: "댓글 생성이 완료되었습니다." });
      queryClient.invalidateQueries(["comment"]);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 생성을 실패하였습니다." });
    }
  };

  const isLikeCommentMutation = getUpdateCommentLike();
  const isLikeComment = async (isLikeComment) => {
    try {
      await isLikeCommentMutation.mutateAsync(isLikeComment);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CommentList sort={"all"} onSubmit={handleSubmit} />
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
