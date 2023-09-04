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
  getUpdateReplyCommentLike,
  getUpdateComment,
  getUpdateReplyComment,
  getDeleteComment,
  getDeleteReplyComment,
} from "../../hooks/useCommentQuery";

const Comment = ({ postId }: { postId: string }) => {
  const createCommentMutation = getCreateComment();
  const queryClient = useQueryClient();

  // 게시글 댓글 생성하기
  const handleSubmit = async (comment: string) => {
    try {
      const commentData = {
        tripId: postId,
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

  // 게시글 대댓글 생성하기
  const createReplyCommentMutation = getCreateReplyComment();
  const handleReplyCommentSubmit = async (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => {
    try {
      const replyCommentData = {
        tripId: postId,
        content: comment,
        replyToNickname: replyToNickname,
        parentId: parentId,
      };
      await createReplyCommentMutation.mutateAsync(replyCommentData);
      Toast.show({ type: "success", text1: "댓글 생성이 완료되었습니다." });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 생성을 실패하였습니다." });
    }
  };

  // 게시글 댓글 좋아요 요청
  const isLikeCommentMutation = getUpdateCommentLike();
  const likeComment = async (likeCommentId: string, isLikeStatus: boolean) => {
    try {
      await isLikeCommentMutation.mutateAsync(likeCommentId);
      queryClient.invalidateQueries(["commentTripId"]);
      if (isLikeStatus) {
        Toast.show({ type: "success", text1: "좋아요가 해제되었습니다." });
      } else {
        Toast.show({ type: "success", text1: "좋아요가 표시되었습니다." });
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 게시글 대댓글 좋아요 요청
  const isLikeReplyCommentMutation = getUpdateReplyCommentLike();
  const likeReplyComment = async (
    likeCommentId: string,
    parentId: string,
    isLikeStatus: boolean
  ) => {
    try {
      const replyCommentData = {
        likeReplyCommentId: likeCommentId,
        parentId: parentId,
      };
      await isLikeReplyCommentMutation.mutateAsync(replyCommentData);
      queryClient.invalidateQueries(["commentTripId"]);
      if (isLikeStatus) {
        Toast.show({ type: "success", text1: "좋아요가 해제되었습니다." });
      } else {
        Toast.show({ type: "success", text1: "좋아요가 표시되었습니다." });
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 댓글 content 수정 요청
  const updateCommentMutation = getUpdateComment();
  const updateComment = async (updateCommentId: string, content: string) => {
    try {
      const updateData = {
        id: updateCommentId,
        content: content,
      };
      await updateCommentMutation.mutateAsync(updateData);
      Toast.show({ type: "success", text1: "댓글 수정 완료!" });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 수정 실패!" });
    }
  };

  // 대댓글 content 수정 요청
  const updateReplyCommentMutation = getUpdateReplyComment();
  const updateReplyComment = async (
    updateReplyCommentId: string,
    parentId: string,
    content: string
  ) => {
    try {
      const updateReplyData = {
        id: updateReplyCommentId,
        parentId: parentId,
        content: content,
      };
      await updateReplyCommentMutation.mutateAsync(updateReplyData);
      Toast.show({ type: "success", text1: "댓글 수정 완료!" });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 수정 실패!" });
    }
  };

  // 댓글 삭제요청
  const deleteCommentMutation = getDeleteComment();
  const deleteComment = async (id: string) => {
    try {
      await deleteCommentMutation.mutateAsync(id);
      Toast.show({ type: "success", text1: "댓글 삭제 완료!" });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 삭제 실패!" });
    }
  };

  // 대댓글 삭제요청
  const deleteReplyCommentMutation = getDeleteReplyComment();
  const deleteReplyComment = async (id: string, parentId: string) => {
    try {
      const deleteData = {
        id: id,
        parentId: parentId,
      };
      await deleteReplyCommentMutation.mutateAsync(deleteData);
      Toast.show({ type: "success", text1: "댓글 삭제 완료!" });
      queryClient.invalidateQueries(["commentTripId"]);
    } catch (error) {
      console.error("오류 발생:", error);
      Toast.show({ type: "error", text1: "댓글 삭제 실패!" });
    }
  };

  return (
    <View style={styles.container}>
      <CommentList
        sort={"all"}
        postId={postId}
        onReplySubmit={handleReplyCommentSubmit}
        likeComment={likeComment}
        likeReplyComment={likeReplyComment}
        updateComment={updateComment}
        updateReplyComment={updateReplyComment}
        deleteComment={deleteComment}
        deleteReplyComment={deleteReplyComment}
      />
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
