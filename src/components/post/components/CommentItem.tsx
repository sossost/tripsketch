import { StyleSheet, Text, View, Image } from "react-native";
import { Comment } from "../../../types/comment";

const CommentItem = ({ comment, sort }: { comment: Comment; sort: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.profile}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        ></Image>
      </View>
      <View style={styles.text}>
        <View style={styles.top}>
          <Text style={styles.id}>허니자몽</Text>
          <View style={styles.likes}>
            <Image
              style={styles.heart}
              source={require("../../../assets/images/heart.png")}
            ></Image>
            <Text style={styles.like_length}>{comment.like.length}</Text>
          </View>
        </View>
        <Text style={styles.date}>{comment.create_at}</Text>
        <Text style={styles.comment}>{comment.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
  },
  image: {
    width: "17%",
  },
  profile: {
    width: 37,
    height: 37,
    backgroundColor: "grey",
    borderRadius: 50,
    overflow: "hidden",
  },
  text: {
    width: "83%",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  id: {
    fontWeight: "600",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  heart: {
    width: 14,
    height: 14,
    resizeMode: "stretch",
  },
  like_length: {
    fontSize: 12,
    color: "#6f6f6f",
  },
  date: {
    fontSize: 11,
    color: "#b3b3b3",
  },
  comment: {
    fontSize: 14,
    color: "#6f6f6f",
    marginTop: 8,
  },
});

export default CommentItem;
