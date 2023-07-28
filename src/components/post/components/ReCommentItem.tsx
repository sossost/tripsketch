import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ReComment } from "../../../types/ReComment";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const ReCommentItem = ({ recomment }: { recomment: ReComment }) => {
  const [likes, setLikes] = useState(recomment.liked_user_list);
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
    <View style={styles.recomment_container}>
      <View style={styles.image}>
        <Image
          style={styles.profile}
          source={{ uri: recomment.user.profile_img }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.nickname}>{recomment.user.nickName}</Text>
        <Text style={styles.comment}>{recomment.content}</Text>
        <View style={styles.likes}>
          <Text>
            {/* <EvilIcons name="heart" size={20} color="#777" /> */}
            <TouchableOpacity onPress={handleLike}>
              <Ionicons
                name={isLiked ? "md-heart-sharp" : "md-heart-outline"}
                size={18}
                color={isLiked ? "#ec6565" : "#777"}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.likes_text}>{likes.length}</Text>
        </View>
      </View>
      <View style={styles.delete}>
        <Feather name="x" size={10} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ReCommentItem;