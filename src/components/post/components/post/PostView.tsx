import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetCurrentUser } from "../../../../hooks/useUserQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../../types/RootStack";
import Slick from "react-native-slick";
import useDeleteAlert from "../../hooks/useDeleteAlert";
import { GetPost } from "../../../../types/Post";
import NonePostView from "./NonePostView";
import { LINK } from "@constants/link";

type PostViewProps = {
  postId: string;
  deletePost: (postId: string) => Promise<void>;
  postData: GetPost["tripAndCommentPairDataByTripId"]["first"];
};

const PostView = ({ postId, deletePost, postData }: PostViewProps) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const { data: userData } = useGetCurrentUser();
  const navigation = useNavigation<StackNavigation>();

  if (!postData) {
    return <NonePostView />;
  }

  const settingBox = () => {
    setIsSettingOpen(!isSettingOpen);
  };

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

  const postUpdateHandler = () => {
    navigation.navigate("UpdatePost", { postId: postData.id });
    setIsSettingOpen(!isSettingOpen);
  };

  // 게시글 삭제 핸들러
  const postDeleteHandler = (postId: string) => {
    const deleteAlertFunction = useDeleteAlert({
      id: postId,
      deleteRequest: deletePost,
      alertTitle: "정말 삭제하시겠습니까?",
      alertCancel: "괜찮습니다.",
      alertOk: "삭제",
    });
    deleteAlertFunction();
  };
  postId;

  const followerHandler = () => {
    navigation.navigate(LINK.USER_PAGE, { nickname: postData.nickname });
  };

  return (
    <View style={[styles.container]}>
      <StatusBar
        animated={true}
        backgroundColor="#0f0f0f"
        barStyle={"light-content"}
        showHideTransition={"slide"}
      />
      <ImageBackground
        source={{ uri: postData.images[0] }}
        resizeMode="cover"
        style={styles.image_bg}
      >
        <View style={styles.opacity}></View>
        <View style={styles.header_container}>
          <TouchableOpacity
            style={styles.back_btn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={28}
              color="#9f9f9f"
            />
          </TouchableOpacity>
          <View style={styles.ellipsis}>
            {userData?.nickname === postData.nickname || userData?.isAdmin ? (
              <TouchableOpacity onPress={settingBox}>
                <Ionicons name="ellipsis-vertical" size={18} color="#9f9f9f" />
              </TouchableOpacity>
            ) : null}
            {isSettingOpen && (
              <View style={styles.setting_box}>
                {userData?.nickname !== postData.nickname &&
                userData?.isAdmin ? null : (
                  <TouchableOpacity onPress={postUpdateHandler}>
                    <Text style={styles.setting_box_text}>수정하기</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => postDeleteHandler(postId)}>
                  <Text style={styles.setting_box_text}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={3}>
            {postData.title}
          </Text>
        </View>
        <View style={styles.writer_container}>
          <TouchableOpacity onPress={followerHandler}>
            <Text style={styles.writer}>by {postData.nickname}</Text>
          </TouchableOpacity>
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
  none_postData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
  },
  image_bg: {
    width: "100%",
    height: 240,
    paddingVertical: 40,
    position: "relative",
  },
  opacity: {
    position: "absolute",
    width: "100%",
    height: 240,
    paddingVertical: 40,
    backgroundColor: "#000",
    opacity: 0.6,
    top: 0,
  },
  header_container: {
    paddingHorizontal: 15,
    height: 40,
    display: "flex",
    justifyContent: "center",
  },
  back_btn: {
    width: 30,
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
    width: "100%",
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
    zIndex: 10,
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
    paddingVertical: Platform.OS === "android" ? 3 : 7,
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
    padding: Platform.OS === "android" ? 13 : 17,
  },
  trip_date_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Platform.OS === "android" ? 0 : 1,
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
    marginTop: Platform.OS === "android" ? 0 : 5,
  },
  content_text: {
    lineHeight: 18,
  },
});

export default PostView;
