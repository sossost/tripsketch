import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { useState } from "react";

const CommentInput = () => {
  const [comment, setComment] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    color: "#6f6f6f",
    borderRadius: 30,
  },
});

export default CommentInput;
