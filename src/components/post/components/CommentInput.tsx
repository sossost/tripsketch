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
  onSubmit?: (comment: string, parentId?: string) => void;
  commentId?: string;
  commentNickname?: string;
};

const CommentInput = ({
  onSubmit,
  commentId,
  commentNickname,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");

  const parentId = commentId ? commentId : "";

  const submitComment = () => {
    if (onSubmit && comment !== "") {
      onSubmit(comment, parentId);
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
    marginTop: 15,
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
