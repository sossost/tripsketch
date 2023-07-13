import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Post } from "../../../types/Post";

type PostCardProps = {
  post: Post;
  isLiked: boolean;
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const PostCard = (props: PostCardProps) => {
  const { post, isLiked } = props;

  // const likeButtonImgPath = isLiked
  //   ? require("../../../assets/images/isLikedIcon.png")
  //   : require("../../../assets/images/isNotLikedIcon.png");
  const likeButtonImgPath = require("../../../assets/images/isNotLikedIcon.png");
  const postImgPath = require("../../../assets/images/test_post.png");
  const userProfilePath = require("../../../assets/images/test_user.png");

  return (
    <View style={styles.postCard}>
      <Image source={postImgPath} style={styles.postImg} />
      <View style={styles.textArea}>
        <View style={styles.upperArea}>
          <Text style={styles.titleArea}>콜럼비아 여행! 넘 즐겁당</Text>

          <Text style={styles.locationArea}>콜럼비아</Text>
        </View>
        <View style={styles.lowerArea}>
          <View style={styles.userArea}>
            <Image source={userProfilePath} style={styles.profilePic} />
            <Text style={styles.userName}>미라벨 마드리갈</Text>
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
    height: SCREEN_HEIGHT - SCREEN_HEIGHT / 3,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  postImg: {
    width: "100%",
    height: "70%",
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
    padding: 6,
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
    width: 50,
    height: 50,
  },
  userName: {
    fontSize: 18,
    fontStyle: "italic",
    marginLeft: 10,
  },
  likeBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
