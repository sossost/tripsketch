import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";

type CommentInputProps = {
  onSubmit?: (comment: string) => void;
  onReplySubmit?: (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => void;
  updateComment?: (updateCommentId: string, content: string) => void;
  updateReplyComment?: (
    updateReplyCommentId: string,
    parentId: string,
    content: string
  ) => void;
  commentId?: string;
  commentNickname?: string;
  updateId?: string;
  parentReplyCommentId?: string;
};

const CommentInput = ({
  onSubmit,
  onReplySubmit,
  updateComment,
  updateReplyComment,
  commentId,
  commentNickname,
  updateId,
  parentReplyCommentId,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const parentId = commentId ? commentId : "";
  const replyToNickname = commentNickname ? commentNickname : "";
  const updateCommentId = updateId ? updateId : "";
  const parentReplyId = parentReplyCommentId ? parentReplyCommentId : "";

  const submitComment = () => {
    if (onSubmit && comment !== "") {
      onSubmit(comment);
      setComment("");
    } else if (onReplySubmit && comment !== "") {
      onReplySubmit(comment, parentId, replyToNickname);
      setComment("");
    } else if (updateComment && comment !== "") {
      updateComment(updateCommentId, comment);
      setComment("");
    } else if (updateReplyComment && comment !== "") {
      updateReplyComment(updateCommentId, parentReplyId, comment);
      setComment("");
    } else {
      Alert.alert("알림", "내용을 입력해주세요.");
    }
  };

  const isCommentIdEmpty = commentId === undefined;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        placeholder={
          isCommentIdEmpty ? "댓글을 입력해주세요" : `@${commentNickname}`
        }
      />
      <TouchableOpacity onPress={submitComment} style={styles.button}>
        <Text style={styles.button_text}>등록 </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
    position: "relative",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 50,
    color: "#6f6f6f",
    borderRadius: 30,
    fontSize: 13,
  },
  button: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -10,
  },
  button_text: {
    color: "#73BBFB",
  },
});

export default CommentInput;
