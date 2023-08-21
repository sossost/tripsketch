import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView as GestureHandlerScrollView } from "react-native-gesture-handler";
import { Comment } from "../../../types/comment";
import { useState } from "react";
import ReCommentItem from "./ReCommentItem";
import CommentInput from "./CommentInput";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CommentItem = ({ comment, sort }: { comment: Comment; sort: string }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isUpdateInput, setIsUpdateInput] = useState(false);

  const [likes, setLikes] = useState(comment.isLiked);
  const [likeNum, setLikeNum] = useState(comment.numberOfLikes);

  const handleLike = () => {
    if (likes) {
      setLikes(false);
      setLikeNum(likeNum - 1);
    } else {
      setLikes(true);
      setLikeNum(likeNum + 1);
    }
  };

  const updateComment = () => {
    Alert.alert(
      "알림",
      "댓글을 수정하시겠습니까?",
      [
        {
          text: "아니요",
          onPress: () => console.log("아니오"),
          style: "cancel",
        },
        { text: "네", onPress: () => console.log("네") },
        // 이벤트 발생시 로그
      ],
      { cancelable: false }
    );
  };

  const handleCommentButtonClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = () => {};

  return (
    <View>
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
                source={{ uri: comment.userProfileUrl }}
              ></Image>
            </View>
            <View style={styles.text}>
              <View style={styles.top}>
                <Text style={styles.id}>{comment.userNickName}</Text>
                <View style={styles.likes}>
                  <TouchableOpacity onPress={handleLike}>
                    <Ionicons
                      name={likes ? "md-heart-sharp" : "md-heart-outline"}
                      size={18}
                      color={likes ? "#ec6565" : "#777"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.like_length}>{likeNum}</Text>
                </View>
              </View>
              <Text style={styles.date}>{comment.createdAt}</Text>
              <Text style={styles.comment}>{comment.content}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.edit]}
          onPress={updateComment}
        >
          <Text style={styles.button_text_edit}>수정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.delete]}>
          <Text style={styles.button_text_delete}>삭제하기</Text>
        </TouchableOpacity>
      </GestureHandlerScrollView>
      {sort === "all" ? (
        <View style={styles.recommentBox}>
          {!showCommentInput ? (
            <TouchableOpacity onPress={handleCommentButtonClick}>
              <Text style={styles.add_comment}>답글 달기</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={handleCommentButtonClick}>
                <Text style={styles.add_comment}>답글 달기</Text>
              </TouchableOpacity>
              <CommentInput
                onSubmit={handleCommentSubmit}
                commentId={comment.id}
                commentNickname={comment.userNickName}
              />
            </View>
          )}
        </View>
      ) : null}
      {sort === "all" && comment.children.length > 0 ? (
        <View style={styles.recomment_container}>
          {comment.children.map((item) => (
            <View key={item.id}>
              <ReCommentItem recomment={item} />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
  },
  normal: {
    display: "flex",
    flexDirection: "row",
  },
  background: {
    backgroundColor: "#f7f7f7",
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    padding: 15,
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
  recommentBox: {
    paddingHorizontal: 20,
  },
  recomment_container: {
    marginTop: 14,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
});

export default CommentItem;
