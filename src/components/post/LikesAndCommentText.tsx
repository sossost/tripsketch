import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useGetPostsById } from "../../hooks/usePostQuery";
import { usePostLike, usePostUnlike } from "../../hooks/usePostQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import LikeAndCommentSkeleton from "./components/comment/LikesAndCommentSkeleton";
import Toast from "react-native-toast-message";

interface LikesAndCommentTextProps {
  postId: string;
  handleIconPress?: (index: number) => void;
}

const LikesAndCommentText = ({
  postId,
  handleIconPress,
}: LikesAndCommentTextProps) => {
  const { postData, isLoading } = useGetPostsById(postId);
  const { data: userData } = useGetCurrentUser();

  // 리스트에서 좋아요 유/무 확인하는 로직
  // const checkLikeUser = () =>
  //   Boolean(
  //     userData?.nickname && postData?.tripLikes.includes(userData.nickname)
  //   );

  const checkLikeUser = postData?.isLiked;
  const [likes, setLikes] = useState(false);
  useEffect(() => {
    setLikes(checkLikeUser);
  }, [userData, postData]);

  // console.log(checkLikeUser);
  // console.log(postData);

  const queryClient = useQueryClient();
  const postLikeMutation = usePostLike();
  const postUnlikeMutation = usePostUnlike();

  // 현재 게시글 좋아요 추가, 해제
  const handleLike = async () => {
    try {
      if (likes) {
        setLikes(false);
        await postUnlikeMutation.mutateAsync(postId);
        Toast.show({ type: "success", text1: "좋아요가 해제되었습니다." });
      } else {
        setLikes(true);
        await postLikeMutation.mutateAsync(postId);
        Toast.show({ type: "success", text1: "좋아요가 표시되었습니다." });
      }
      queryClient.invalidateQueries(["postId"]);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  if (isLoading) {
    return <LikeAndCommentSkeleton />;
  }

  if (!postData) {
    return <Text>Data not available.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={likes ? "md-heart-sharp" : "md-heart-outline"}
            size={26}
            color={likes ? "#ec6565" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress && handleIconPress(1)}>
          <EvilIcons name="comment" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.line}>
        <View style={styles.likeView_container}>
          <View style={styles.likes}>
            <View style={styles.info_name}>
              <Text style={styles.info_text}>좋아요</Text>
            </View>
            <Text style={styles.likeView_text}>{postData.likes}</Text>
          </View>
          <View style={styles.views}>
            <View style={styles.info_name}>
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
