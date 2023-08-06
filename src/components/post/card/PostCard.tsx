import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Post } from "../../../types/Post";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

interface PostCardProps {
  post: Post;
}

const PostCard = (props: PostCardProps) => {
  const currentUser = {
    id: "user3",
    name: "미라벨 마드리갈",
    profile_img: "../../../assets/images/test_user.png",
  };
  const { post } = props;
  const isLiked = post.likes.find((like) => like === currentUser.id)
    ? true
    : false;
  const likeButtonImgPath =
    isLiked === true
      ? require("../../../assets/images/isLikedIcon.png")
      : require("../../../assets/images/isNotLikedIcon.png");
  const userProfilePath = require("../../../assets/images/test_user.png");
  const navigation = useNavigation();

  const postHandler = () => {
    (navigation.navigate as (route: string) => void)("TripDetail");
  };

  return (
    <View style={styles.postCard}>
      <TouchableOpacity style={styles.touchables} onPress={postHandler}>
        <Image source={{ uri: post.thumbnail }} style={styles.postImg} />
      </TouchableOpacity>

      <View style={styles.textArea}>
        <View style={styles.upperArea}>
          <Text style={styles.titleArea}>{post.title}</Text>

          <Text style={styles.locationArea}>{post.location}</Text>
        </View>
        <View style={styles.lowerArea}>
          <View style={styles.userArea}>
            <Image source={userProfilePath} style={styles.profilePic} />
            <Text style={styles.userName}>{post.author}</Text>
          </View>
          <Image source={likeButtonImgPath} style={styles.likeBtn} />
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT - SCREEN_HEIGHT / 2.5,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  touchables: {
    width: "100%",
    height: "70%",
  },
  postImg: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
  },
  textArea: {
    width: "100%",
    height: "30%",
    padding: 10,
  },
  upperArea: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "50%",
    padding: 10,
    paddingTop: 0,
    borderBottomColor: "#dedede",
    borderBottomWidth: 0.5,
  },
  titleArea: {
    width: "100%",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 5,
  },
  locationArea: {
    width: "100%",
    fontSize: 16,
    color: "#73BBFB",
  },
  lowerArea: {
    marginTop: 5,
    width: "100%",
    height: "50%",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userArea: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    borderRadius: 100,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    backgroundColor: "gray",
    width: 45,
    height: 45,
  },
  userName: {
    fontSize: 16,
    fontStyle: "italic",
    marginLeft: 15,
  },
  likeBtn: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
