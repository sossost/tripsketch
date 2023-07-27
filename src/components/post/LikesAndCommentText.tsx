import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../../types/Post";

const LikesAndCommentText = ({ post }: { post: Post }) => {
  const [likes, setLikes] = useState(post.likes);
  const isLiked = likes.includes("1234");

  const handleLike = () => {
    const userLiked = likes.includes("1234");
    if (userLiked) {
      setLikes(likes.filter((id) => id !== "1234"));
    } else {
      setLikes([...likes, "1234"]);
    }
  };

  return (
    <View>
      <View style={styles.icon_container}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={isLiked ? "md-heart-sharp" : "md-heart-outline"}
            size={26}
            color={isLiked ? "#ec6565" : "black"}
          />
        </TouchableOpacity>

        <EvilIcons name="comment" size={32} color="black" />
      </View>
      <View style={styles.line}>
        <View style={styles.likeView_container}>
          <View style={styles.likes}>
            <View style={styles.info_name}>
              <Text style={styles.info_text}>좋아요</Text>
            </View>
            <Text style={styles.likeView_text}>{likes.length}</Text>
          </View>
          <View style={styles.views}>
            <View style={styles.info_name}>
              <Text style={styles.info_text}>조회수</Text>
            </View>
            <Text style={styles.likeView_text}>{post.views}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  line: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopColor: "#e9e9e9",
    borderTopWidth: 1,
    borderBottomColor: "#e9e9e9",
    borderBottomWidth: 1,
  },
  likeView_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  info_name: {},
  info_text: {
    color: "#888",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  likeView_text: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
  },
});

export default LikesAndCommentText;
