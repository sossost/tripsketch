import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Post } from "../../types/Post";
import { CommonStyles } from "../../styles/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import { MixedStyleDeclaration } from "react-native-render-html";
import RenderHtml from "react-native-render-html";

const PostView = ({ post }: { post: Post }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const deviceWidth = Dimensions.get("window").width;

  const settingBox = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  return (
    <View style={[CommonStyles.appContainer, styles.container]}>
      <View style={styles.title_container}>
        <Text style={styles.title}>{post.title}</Text>
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
      <View style={styles.date_container}>
        <View style={styles.trip_date_container}>
          <Text style={styles.trip_date_text}>여행 일정</Text>
          <Text style={styles.trip_date_period}>
            {post.start_at} ~ {post.end_at}
          </Text>
        </View>
        <View style={styles.trip_date_container}>
          <Text style={styles.trip_date_text}>작성일</Text>
          <Text style={styles.trip_date_period}>{post.created_at}</Text>
        </View>
        <View style={styles.bookmark}>
          <Ionicons name="md-bookmark-sharp" size={20} color="#73BBFB" />
        </View>
      </View>
      <RenderHtml
        source={{ html: post.content }}
        contentWidth={deviceWidth}
        tagsStyles={tagStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title_container: {
    position: "relative",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    width: "90%",
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
});

const tagStyles: Record<string, MixedStyleDeclaration> = {
  p: {
    fontSize: 16,
    lineHeight: 25,
    color: "#333",
  },
  img: {
    width: "100%",
    height: "auto",
    resizeMode: "contain",
  },
};

export default PostView;
