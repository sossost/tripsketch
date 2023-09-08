import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGetPostsById } from "../../hooks/usePostQuery";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import PostViewSkeleton from "./components/PostViewSkeleton";
import Slick from "react-native-slick";

const PostView = ({ postId }: { postId: string }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const settingBox = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const { postData, isLoading, isError } = useGetPostsById(postId);
  const { data: userData } = useGetCurrentUser();

  if (isLoading) {
    return <PostViewSkeleton />;
  }

  if (isError) {
    return <Text>error</Text>;
  }

  if (!postData) {
    return <Text>Data not available.</Text>;
  }

  // ISO 날짜, 시간 형식에서 날짜형으로 변환
  const convertDate = (getDate: string) => {
    const dateObject = new Date(getDate);
    const customFormattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    return customFormattedDate;
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={{ uri: postData.images[0] }}
        resizeMode="cover"
        style={styles.image_bg}
      >
        <View style={styles.opacity}></View>

        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={3}>
            {postData.title}
          </Text>
          <View style={styles.ellipsis}>
            {userData?.nickname === postData.nickname ? (
              <TouchableOpacity onPress={settingBox}>
                <Ionicons name="ellipsis-vertical" size={18} color="#9f9f9f" />
              </TouchableOpacity>
            ) : null}
            {isSettingOpen && (
              <View style={styles.setting_box}>
                <Text style={styles.setting_box_text}>수정하기</Text>
                <Text style={styles.setting_box_text}>삭제하기</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.writer_container}>
          <Text style={styles.writer}>by {postData.nickname}</Text>
        </View>
      </ImageBackground>
      <View style={styles.wrap}>
        <View style={styles.date_container}>
          <View style={styles.trip_date_container}>
            <Text style={styles.trip_date_text}>여행 일정</Text>
            <Text style={styles.trip_date_period}>
              {convertDate(postData.startedAt)} ~ {convertDate(postData.endAt)}
            </Text>
          </View>
          <View style={styles.trip_date_container}>
            <Text style={styles.trip_date_text}>작성일</Text>
            <Text style={styles.trip_date_period}>
              {convertDate(postData.createdAt)}
            </Text>
          </View>
          <View style={styles.bookmark}>
            <Ionicons name="md-bookmark-sharp" size={20} color="#73BBFB" />
          </View>
        </View>
      </View>
      {postData.images.length > 0 ? (
        <Slick showsButtons={false} style={styles.slick}>
          {postData.images.map((item, index) => (
            <View key={index} style={styles.slide_container}>
              <Image source={{ uri: item }} style={styles.slide_image} />
            </View>
          ))}
        </Slick>
      ) : (
        <View style={{ height: 25 }}></View>
      )}
      <View style={styles.content_container}>
        <Text style={styles.content_text}>{postData.content}</Text>
      </View>
      <View style={styles.wrap}>
        <View style={styles.tag_container}>
          {postData.hashtag.map((item, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tag_text}>{item}</Text>
            </View>
          ))}
        </View>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    width: "90%",
    color: "#fff",
  },
  ellipsis: {
    position: "absolute",
    right: 20,
  },
  setting_box: {
    position: "absolute",
    width: 100,
    right: 5,
    top: 22,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  setting_box_text: {
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 12,
  },
  tag_container: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
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
    bottom: 30,
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
