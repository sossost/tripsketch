import { StyleSheet, View } from "react-native";
import CommentList from "./components/comment/CommentList";

const CommentBest = ({ postId }: { postId: string }) => {
  return (
    <View style={styles.container}>
      <CommentList sort={"best"} postId={postId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
});

export default CommentBest;
