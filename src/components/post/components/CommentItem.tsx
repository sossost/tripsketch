import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Comment } from "../../../types/comment";
import { useState } from "react";
import ReCommentItem from "./ReCommentItem";
import CommentInput from "./CommentInput";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useGetCurrentUser } from "../../../hooks/useUserQuery";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CommentItem = ({ comment, sort }: { comment: Comment; sort: string }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { data: userData } = useGetCurrentUser();
  const [likes, setLikes] = useState(comment.isLiked);
  const [likeNum, setLikeNum] = useState(comment.numberOfLikes);
  const [isButton, setIsButton] = useState(false);
  const [isUpdateInput, setIsUpdateInput] = useState(false);

  const handleLike = () => {
    if (likes) {
      setLikes(false);
      setLikeNum(likeNum - 1);
    } else {
      setLikes(true);
      setLikeNum(likeNum + 1);
    }
  };

  const handleCommentButtonClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleButton = () => {
    isButton ? setIsButton(false) : setIsButton(true);
    setIsUpdateInput(false);
  };

  const handleUpdate = () => {
    isUpdateInput ? setIsUpdateInput(false) : setIsUpdateInput(true);
  };

  const handleCommentSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
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
                {userData && userData.email === comment.userEmail ? (
                  <TouchableOpacity onPress={handleButton}>
                    <Entypo
                      name="dots-three-vertical"
                      size={14}
                      color="#c5c5c5"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <Text style={styles.date}>{comment.createdAt}</Text>
            <Text style={styles.comment}>{comment.content}</Text>
            <View style={styles.likes_container}>
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
        </View>
        <View>
          {isUpdateInput ? (
            <View style={styles.inputPadd}>
              <CommentInput />
            </View>
          ) : null}
        </View>
        <View>
          {userData && isButton && userData.email === comment.userEmail ? (
            <View style={styles.button_container}>
              <TouchableOpacity
                style={styles.button_update}
                onPress={handleUpdate}
              >
                <Text style={styles.update_txt}>수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_delete}>
                <Text style={styles.update_txt}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
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
              {userData ? (
                <ReCommentItem recomment={item} userData={userData} />
              ) : (
                <Text>사용자 데이터를 사용할 수 없습니다.</Text>
              )}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  container_inner: {
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
  date: {
    fontSize: 11,
    color: "#b3b3b3",
  },
  comment: {
    fontSize: 14,
    color: "#6f6f6f",
    marginTop: 6,
  },
  likes_container: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    gap: 3,
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

  add_comment: {
    fontSize: 11,
    color: "#6f6f6f",
    marginTop: 8,
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
  inputPadd: { paddingHorizontal: 10 },
  button_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    gap: 5,
  },
  button_update: {
    width: "50%",
    backgroundColor: "#73BBFB",
    paddingVertical: 10,
    borderRadius: 5,
  },
  update_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
  button_delete: {
    width: "50%",
    textAlign: "center",
    backgroundColor: "#939393",
    paddingVertical: 10,
    borderRadius: 5,
  },
  delete_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
});

export default CommentItem;
