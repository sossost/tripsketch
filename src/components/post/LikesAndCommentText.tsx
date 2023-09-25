import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { usePostLike } from "../../hooks/usePostQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import { GetPost } from "../../types/Post";
import { colors } from "../../constants/color";
import Toast from "react-native-toast-message";
import PostViewMap from "./components/post/PostViewMap";

interface LikesAndCommentTextProps {
  postId: string;
  postData: GetPost["tripAndCommentPairDataByTripId"]["first"];
  likesModal: () => void;
}

const LikesAndCommentText = ({
  postId,
  postData,
  likesModal,
}: LikesAndCommentTextProps) => {
  const { data: userData } = useGetCurrentUser();
  const checkLikeUser = postData?.isLiked;
  const [likes, setLikes] = useState(false);
  const [isLocation, setIsLocation] = useState<boolean>(false);

  useEffect(() => {
    setLikes(checkLikeUser);
  }, [userData, postData]);

  const queryClient = useQueryClient();
  const postLikeMutation = usePostLike();

  // 현재 게시글 좋아요 추가, 해제
  const handleLike = async () => {
    try {
      if (likes) {
        setLikes(false);
        await postLikeMutation.mutateAsync(postId);
        Toast.show({ type: "success", text1: "좋아요가 해제되었습니다." });
      } else {
        setLikes(true);
        await postLikeMutation.mutateAsync(postId);
        Toast.show({ type: "success", text1: "좋아요가 표시되었습니다." });
      }
      queryClient.invalidateQueries(["postAndComment"]);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <TouchableOpacity
          onPress={() => setIsLocation(!isLocation)}
          style={styles.location_btn}
        >
          <Ionicons name="location-sharp" size={16} color="white" />
          <Text style={styles.location_text}>위치</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLocation ? (
          postData.latitude !== null ? (
            <View>
              <PostViewMap
                latitude={postData.latitude}
                longitude={postData.longitude}
              />
            </View>
          ) : (
            <Text
              style={{ textAlign: "right", marginRight: 15, marginBottom: 10 }}
            >
              위치 데이터가 존재하지 않습니다.
            </Text>
          )
        ) : null}
      </View>
      <View style={styles.line}>
        <View style={styles.likeView_container}>
          <View style={styles.likes}>
            <View style={styles.info_name}>
              <TouchableOpacity onPress={handleLike} style={{ marginRight: 3 }}>
                {userData ? (
                  <Ionicons
                    name={likes ? "md-heart-sharp" : "md-heart-outline"}
                    size={23}
                    color={likes ? "#ec6565" : "#555"}
                    style={{ lineHeight: 30, textAlign: "center" }}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity onPress={likesModal}>
                <Text style={styles.info_text}>좋아요</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.likeView_text}>{postData.likes}</Text>
          </View>
          <View style={styles.views}>
            <View style={styles.info_name}>
              <AntDesign
                name="eyeo"
                size={23}
                color="#555"
                style={{ lineHeight: 30, textAlign: "center", marginRight: 3 }}
              />
              <Text style={styles.info_text}>조회수</Text>
            </View>
            <Text style={styles.likeView_text}>{postData.views}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon_container: {
    marginVertical: 12,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  location_btn: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 7,
    paddingRight: 9,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location_text: {
    color: "#fff",
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
  info_name: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  info_text: {
    color: "#888",
    lineHeight: 28,
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
