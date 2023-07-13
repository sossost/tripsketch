import { StyleSheet, View } from "react-native";
import CommentList from "./components/CommentList";

const CommentBest = () => {
  return (
    <View style={styles.container}>
      <CommentList sort={"best"} />
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
