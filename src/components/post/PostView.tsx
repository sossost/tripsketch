import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { Post } from "../../types/Post";
import { Ionicons } from "@expo/vector-icons";
import Slick from "react-native-slick";

const PostView = ({ post }: { post: Post }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const settingBox = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={{ uri: post.image[0] }}
        resizeMode="cover"
        style={styles.image_bg}
      >
        <View style={styles.opacity}></View>
        <View style={styles.wrap}>
          <View style={styles.title_container}>
            <Text style={styles.title} numberOfLines={3}>
              {post.title}
            </Text>
            <View style={styles.ellipsis}>
              <TouchableOpacity onPress={settingBox}>
                <Ionicons name="ellipsis-vertical" size={18} color="#9f9f9f" />
              </TouchableOpacity>
              {isSettingOpen && (
                <View style={styles.setting_box}>
                  <Text style={styles.setting_box_text}>수정하기</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.tag_container}>
            {post.hashtag.map((item, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tag_text}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.writer_container}>
            <Text style={styles.writer}>by {post.user.nickName}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.wrap}>
        <View style={styles.date_container}>
          <View style={styles.trip_date_container}>
            <Text style={styles.trip_date_text}>여행 일정</Text>
            <Text style={styles.trip_date_period}>
              {post.startAt} ~ {post.endAt}
            </Text>
          </View>
          <View style={styles.trip_date_container}>
            <Text style={styles.trip_date_text}>작성일</Text>
            <Text style={styles.trip_date_period}>{post.createdAt}</Text>
          </View>
          <View style={styles.bookmark}>
            <Ionicons name="md-bookmark-sharp" size={20} color="#73BBFB" />
          </View>
        </View>
      </View>
      <Slick showsButtons={false} style={styles.slick}>
        {post.image.map((item, index) => (
          <View key={index} style={styles.slide_container}>
            <Image source={{ uri: item }} style={styles.slide_image} />
          </View>
        ))}
      </Slick>
      <View style={styles.content_container}>
        <Text style={styles.content_text}>{post.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image_bg: {
    width: "100%",
    height: 200,
    paddingVertical: 40,
    position: "relative",
  },
  opacity: {
    position: "absolute",
    width: "100%",
    height: 200,
    paddingVertical: 40,
    backgroundColor: "#000",
    opacity: 0.6,
    top: 0,
  },
  wrap: {
    paddingHorizontal: 20,
  },
  title_container: {
    position: "relative",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    width: "90%",
    color: "#fff",
  },
  ellipsis: {
    position: "absolute",
    right: 0,
  },
  setting_box: {
    position: "absolute",
    width: 80,
    right: 5,
    top: 22,
    backgroundColor: "#ddd",
  },
  setting_box_text: {
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 12,
  },
  tag_container: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  tag: {
    borderColor: "#73BBFB",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  tag_text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#73BBFB",
  },
  writer_container: {
    position: "absolute",
    bottom: -43,
    right: 20,
  },
  writer: {
    color: "#ddd",
    textAlign: "right",
    fontSize: 14,
  },
  date_container: {
    position: "relative",
    marginTop: 15,
    backgroundColor: "#f7f7f7",
    padding: 13,
  },
  trip_date_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  trip_date_text: {
    fontSize: 13,
    width: "25%",
    fontWeight: "600",
  },
  trip_date_period: {
    fontSize: 13,
  },
  bookmark: {
    position: "absolute",
    right: 3,
    top: -2,
  },

  //slick slide Style
  slick: {
    height: 400,
    marginTop: 7,
    marginBottom: 20,
  },
  slide_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide_image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },

  content_container: {
    paddingHorizontal: 20,
  },
  content_text: {
    lineHeight: 18,
  },
});

export default PostView;
