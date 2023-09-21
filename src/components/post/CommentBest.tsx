import { StyleSheet, View } from "react-native";
import CommentList from "./components/comment/CommentList";
import { GetPost } from "../../types/Post";

type CommentBestProps = {
  commentData: GetPost["tripAndCommentPairDataByTripId"]["second"];
};

const CommentBest = ({ commentData }: CommentBestProps) => {
  return (
    <View style={styles.container}>
      <CommentList sort={"best"} commentData={commentData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
});

export default CommentBest;
