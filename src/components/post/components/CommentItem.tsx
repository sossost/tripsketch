import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView as GestureHandlerScrollView } from "react-native-gesture-handler";
import { Comment } from "../../../types/comment";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CommentItem = ({ comment, sort }: { comment: Comment; sort: string }) => {
  return (
    <GestureHandlerScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={[styles.normal, sort === "best" && styles.background]}>
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
            {sort === "all" ? (
              <Text style={styles.add_comment}>답글 달기</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={[styles.button, styles.edit]}>
        <Text style={styles.button_text_edit}>수정하기</Text>
      </View>
      <View style={[styles.button, styles.delete]}>
        <Text style={styles.button_text_delete}>삭제하기</Text>
      </View>
    </GestureHandlerScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
  },
  normal: {
    display: "flex",
    flexDirection: "row",
  },
  background: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    padding: 15,
    shadowColor: "#5555557a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
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
    marginTop: 6,
  },
  add_comment: {
    fontSize: 11,
    color: "#6f6f6f",
    marginTop: 8,
  },
  button: {
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    backgroundColor: "#ececec",
  },
  delete: {
    backgroundColor: "#ff7777",
  },
  button_text_edit: {
    fontSize: 13,
  },
  button_text_delete: {
    fontSize: 13,
    color: "#fff",
  },
});

export default CommentItem;
