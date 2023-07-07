import { StyleSheet, View } from "react-native";
import { CommonStyles } from "../../styles/CommonStyles";
import CommentList from "./components/CommentList";

const CommentBest = () => {
  return (
    <View style={[CommonStyles.appContainer, styles.container]}>
      <CommentList sort={"best"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default CommentBest;
