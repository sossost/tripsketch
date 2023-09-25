import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Comment } from "../../../../types/comment";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useGetCurrentUser } from "../../../../hooks/useUserQuery";
import ReCommentItem from "./ReCommentItem";
import CommentInput from "./CommentInput";
import useDeleteAlert from "../../hooks/useDeleteAlert";
import { LINK } from "@constants/link";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@types/RootStack";
import { useCreateTime } from "@hooks/useCreateTime";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CommentProps = {
  onReplySubmit?: (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => void;
  sort: string;
  comment: Comment;
  likeComment?: (likeCommentId: string, isLikeStatus: boolean) => void;
  likeReplyComment?: (
    likeCommentId: string,
    parentId: string,
    isLikeStatus: boolean
  ) => void;
  updateComment?: (updateCommentId: string, content: string) => void;
  updateReplyComment?: (
    updateReplyCommentId: string,
    parentId: string,
    content: string
  ) => void;
  deleteComment?: (id: string) => void;
  deleteReplyComment?: (id: string, parentId: string) => void;
};

const CommentItem = ({
  comment,
  sort,
  onReplySubmit,
  likeComment,
  likeReplyComment,
  updateComment,
  updateReplyComment,
  deleteComment,
  deleteReplyComment,
}: CommentProps) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { data: userData } = useGetCurrentUser();
  const [likes, setLikes] = useState(comment.isLiked);
  const [isButton, setIsButton] = useState(false);
  const [isUpdateInput, setIsUpdateInput] = useState(false);

  const navigation = useNavigation<StackNavigation>();
  const likeCommentId = comment.id;
  const isLikeStatus = likes;

  const handleLike = () => {
    if (likeComment) {
      const updatedLikeStatus = !likes;
      likeComment(likeCommentId, isLikeStatus);
      setLikes(updatedLikeStatus);
    }
  };

  const handleCommentButtonClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleButton = () => {
    isButton ? setIsButton(false) : setIsButton(true);
    setIsUpdateInput(false);
  };

  // comment 수정하기 유/무 체크하기
  const handleUpdate = () => {
    isUpdateInput ? setIsUpdateInput(false) : setIsUpdateInput(true);
  };

  const formattedDate = () => {
    const originalDate = comment.createdAt;
    const cutDate = originalDate.split("T")[0];
    return cutDate;
  };

  // 생성일에서 한국 시간대로 추출하기
  const createTime = useCreateTime(comment.createdAt);

  // 댓글 삭제 핸들러
  const handleDelete = () => {
    const deleteAlertFunction = useDeleteAlert({
      id: comment.id,
      deleteRequest: deleteComment,
      alertTitle: "정말 삭제하시겠습니까?",
      alertCancel: "괜찮습니다.",
      alertOk: "삭제",
    });
    deleteAlertFunction();
    setIsButton(false);
  };

  const followerHandler = () => {
    navigation.navigate(LINK.USER_PAGE, { nickname: comment.userNickName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <View style={[styles.normal, sort === "preview" && styles.background]}>
          <View style={styles.image}>
            <Image
              style={styles.profile}
              source={{ uri: comment.userProfileUrl }}
            ></Image>
          </View>
          <View style={styles.text}>
            <View style={styles.top}>
              <TouchableOpacity onPress={followerHandler}>
                <Text style={styles.id}>{comment.userNickName}</Text>
              </TouchableOpacity>
              <View style={styles.likes}>
                {userData &&
                comment.isDeleted === false &&
                (userData.isAdmin ||
                  userData.nickname === comment.userNickName) ? (
                  <TouchableOpacity onPress={handleButton}>
                    <Entypo
                      name="dots-three-vertical"
                      size={14}
                      color="#c5c5c5"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            {comment.isDeleted ? null : (
              <View style={styles.date_container}>
                <Text style={styles.date}>{formattedDate()}</Text>
                <Text style={styles.date_dot}> · </Text>
                <Text style={styles.date}>{createTime}</Text>
              </View>
            )}
            <Text style={styles.comment}>{comment.content}</Text>
            {comment.isDeleted ? null : (
              <View style={styles.likes_container}>
                <TouchableOpacity
                  onPress={handleLike}
                  disabled={!userData ? true : false}
                >
                  <Ionicons
                    name={
                      comment.isLiked ? "md-heart-sharp" : "md-heart-outline"
                    }
                    size={18}
                    color={comment.isLiked ? "#ec6565" : "#777"}
                  />
                </TouchableOpacity>
                <Text style={styles.like_length}>{comment.numberOfLikes}</Text>
              </View>
            )}
          </View>
        </View>
        <View>
          {isUpdateInput ? (
            <View style={styles.inputPadd}>
              <CommentInput
                updateComment={updateComment}
                updateId={comment.id}
              />
            </View>
          ) : null}
        </View>
        <View>
          {userData && isButton ? (
            <View style={styles.button_container}>
              {userData?.nickname !== comment.userNickName &&
              userData?.isAdmin ? null : (
                <TouchableOpacity
                  style={styles.button_update}
                  onPress={handleUpdate}
                >
                  <Text style={styles.update_txt}>수정하기</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={
                  userData?.isAdmin &&
                  userData?.nickname !== comment.userNickName
                    ? styles.button_admin
                    : styles.button_delete
                }
                onPress={handleDelete}
              >
                <Text style={styles.update_txt}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      {sort === "all" && userData ? (
        <View style={styles.recommentBox}>
          {!showCommentInput ? (
            <TouchableOpacity onPress={handleCommentButtonClick}>
              <Text style={styles.add_comment}>답글 달기</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={handleCommentButtonClick}>
                <Text style={styles.add_comment}>답글 달기</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 15 }}>
                <CommentInput
                  onReplySubmit={onReplySubmit}
                  commentId={comment.id}
                  commentNickname={comment.userNickName}
                />
              </View>
            </View>
          )}
        </View>
      ) : null}
      {comment.children.length > 0 ? (
        <View style={styles.recomment_container}>
          {comment.children.map((item) => (
            <View key={item.id}>
              <ReCommentItem
                recomment={item}
                userData={userData}
                likeReplyComment={likeReplyComment}
                updateReplyComment={updateReplyComment}
                deleteReplyComment={deleteReplyComment}
              />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  container_inner: {
    paddingVertical: 12,
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
  },
  normal: {
    display: "flex",
    flexDirection: "row",
  },
  background: {
    backgroundColor: "#fff",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: -5,
  },
  image: {
    width: "17%",
  },
  profile: {
    width: 37,
    height: 37,
    backgroundColor: "grey",
    borderRadius: 50,
    overflow: "hidden",
  },
  text: {
    width: "83%",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  id: {
    fontWeight: "600",
  },
  date_container: {
    display: "flex",
    flexDirection: "row",
  },
  date: {
    fontSize: 11,
    color: "#b3b3b3",
    marginTop: Platform.OS === "android" ? 0 : 3,
  },
  date_dot: {
    fontSize: 11,
    color: "#b3b3b3",
    marginTop: Platform.OS === "android" ? 0 : 3,
  },
  comment: {
    fontSize: 14,
    color: "#6f6f6f",
    marginTop: 6,
  },
  likes_container: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  heart: {
    width: 14,
    height: 14,
    resizeMode: "stretch",
  },
  like_length: {
    fontSize: 12,
    color: "#6f6f6f",
  },

  add_comment: {
    fontSize: 11,
    color: "#6f6f6f",
  },
  recommentBox: {
    paddingHorizontal: 20,
  },
  recomment_container: {
    marginTop: 14,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputPadd: { paddingHorizontal: 10, marginTop: 10 },
  button_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    gap: 5,
  },
  button_update: {
    width: "50%",
    backgroundColor: "#73BBFB",
    paddingVertical: 10,
    borderRadius: 5,
  },
  update_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
  button_delete: {
    width: "50%",
    textAlign: "center",
    backgroundColor: "#939393",
    paddingVertical: 10,
    borderRadius: 5,
  },
  button_admin: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#939393",
    paddingVertical: 10,
    borderRadius: 5,
  },
  delete_txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
  },
});

export default CommentItem;
