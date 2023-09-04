import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import {
  getPostCommentListByTripId,
  getPostCommentGuestListByTripId,
} from "../../../hooks/useCommentQuery";
import CommentNone from "./CommentNone";
import CommentSkeleton from "./CommentSkeleton";
import { Comment } from "../../../types/comment";
import { useGetCurrentUser } from "../../../hooks/useUserQuery";

type CommentProps = {
  onReplySubmit?: (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => void;
  sort: string;
  postId: string;
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

const CommentList = ({
  sort,
  postId,
  onReplySubmit,
  likeComment,
  likeReplyComment,
  updateComment,
  updateReplyComment,
  deleteComment,
  deleteReplyComment,
}: CommentProps) => {
  // 유저 정보 불러와 로그인 확인하기
  const { data: userData } = useGetCurrentUser();
  const userDataPresent = userData ? true : false;

  // 회원 접근 시 사용하는 Comment 데이터
  const {
    commentData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = getPostCommentListByTripId(postId);

  // 게스트로 접근 시 사용하는 Comment 데이터
  const {
    commentGuestData,
    isLoading: isGuestDataLoading,
    isError: isGuestDataError,
  } = getPostCommentGuestListByTripId(postId);

  // CommentData 로딩 시
  if (
    (userDataPresent && isUserDataLoading) ||
    (!userDataPresent && isGuestDataLoading)
  ) {
    return <CommentSkeleton />;
  }

  // CommentData 에러 시
  if (
    (userDataPresent && isUserDataError) ||
    (!userDataPresent && isGuestDataError)
  ) {
    return <Text>error</Text>;
  }

  // userData에 따라 적절한 commentData를 선택
  const selectedCommentData = userDataPresent ? commentData : commentGuestData;

  // 댓글, 대댓글 카운트 함수
  const countComment = (commentData: Comment[]): number => {
    const commentCounts = commentData.length;
    const reCommentCounts = commentData
      .map((item) => {
        return item.children.length !== 0 ? item.children.length : 0;
      })
      .reduce((acc, cur) => (acc += cur), 0);
    return commentCounts + reCommentCounts;
  };

  return (
    <View style={styles.container}>
      <View style={styles.comment_title}>
        <Text>댓글</Text>
        <Text style={styles.comment_title_number}>
          {countComment(selectedCommentData)}
        </Text>
      </View>
      {commentData.length !== 0 ? (
        <View>
          {sort === "all" ? (
            <View style={styles.comment}>
              {selectedCommentData.map((item: any) => (
                <View key={item.id}>
                  <CommentItem
                    comment={item}
                    sort={"all"}
                    onReplySubmit={onReplySubmit}
                    likeComment={likeComment}
                    likeReplyComment={likeReplyComment}
                    updateComment={updateComment}
                    updateReplyComment={updateReplyComment}
                    deleteComment={deleteComment}
                    deleteReplyComment={deleteReplyComment}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.comment}>
              {selectedCommentData.slice(0, 1).map((item: any) => (
                <View key={item.id}>
                  <CommentItem comment={item} sort={"best"} />
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <CommentNone />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  comment_title: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 5,
    fontWeight: "600",
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  comment_title_number: {
    fontWeight: "600",
  },
  comment: {},
  none_data: {},
});

export default CommentList;
