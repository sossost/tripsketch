import { StyleSheet, View } from "react-native";
import CommentList from "./components/comment/CommentList";
import { GetPost } from "../../types/Post";

type CommentBestProps = {
  postId: string;
  commentData: GetPost["tripAndCommentPairDataByTripId"]["second"];
};

const CommentBest = ({ postId, commentData }: CommentBestProps) => {
  return (
    <View style={styles.container}>
      <CommentList sort={"best"} postId={postId} commentData={commentData} />
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
