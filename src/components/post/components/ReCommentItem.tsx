import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Comment } from "../../../types/comment";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CommentInput from "./CommentInput";

const ReCommentItem = ({ recomment }: { recomment: Comment }) => {
  const [likes, setLikes] = useState(recomment.isLiked);
  const [likeNum, setLikeNum] = useState(recomment.numberOfLikes);
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

  const handleButton = () => {
    isButton ? setIsButton(false) : setIsButton(true);
    setIsUpdateInput(false);
  };

  const handleUpdate = () => {
    isUpdateInput ? setIsUpdateInput(false) : setIsUpdateInput(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.recomment_container}
        onPress={handleButton}
      >
        <View style={styles.image}>
          <Image
            style={styles.profile}
            source={{ uri: recomment.userProfileUrl }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.nickname}>{recomment.userNickName}</Text>
          <Text style={styles.comment}>{recomment.content}</Text>
          <View style={styles.likes}>
            <Text>
              <TouchableOpacity onPress={handleLike}>
                <Ionicons
                  name={likes ? "md-heart-sharp" : "md-heart-outline"}
                  size={18}
                  color={likes ? "#ec6565" : "#777"}
                />
              </TouchableOpacity>
            </Text>
            <Text style={styles.likes_text}>{likeNum}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        {isUpdateInput ? (
          <View>
            <CommentInput />
          </View>
        ) : null}
      </View>
      <View>
        {isButton ? (
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
  );
};

const styles = StyleSheet.create({
  container: {},
  recomment_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "#444",
    borderRadius: 30,
    overflow: "hidden",
  },
  profile: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
  info: {
    paddingLeft: 10,
    flex: 5,
  },
  nickname: {
    fontSize: 13,
    fontWeight: "600",
  },
  comment: {
    fontSize: 13,
    color: "#6f6f6f",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  likes_text: {
    fontSize: 12,
    marginLeft: 2,
    color: "#777",
  },
  delete: {},
  button_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
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

export default ReCommentItem;
