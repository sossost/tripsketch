import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Text,
} from "react-native";
import { useState } from "react";

type CommentInputProps = {
  onSubmit?: () => void;
  commentId?: string;
  commentNickname?: string;
};

const CommentInput = ({
  onSubmit,
  commentId,
  commentNickname,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    Alert.alert("Simple Button pressed");
  };

  const isCommentIdEmpty = commentId === undefined;

  console.log(commentNickname);
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
    padding: 10,
    color: "#6f6f6f",
    borderRadius: 30,
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
