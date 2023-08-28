import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { getPostCommentListByTripId } from "../../../hooks/useCommentQuery";

type CommentProps = {
  onReplySubmit?: (
    comment: string,
    parentId: string,
    replyToNickname: string
  ) => void;
  sort: string;
  likeComment?: (likeCommentId: string, isLikeStatus: boolean) => void;
  likeReplyComment?: (
    likeCommentId: string,
    parentId: string,
    isLikeStatus: boolean
  ) => void;
};

const CommentList = ({
  sort,
  onReplySubmit,
  likeComment,
  likeReplyComment,
}: CommentProps) => {
  const { commentData, isLoading, isError } =
    getPostCommentListByTripId("1234");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.comment_title}>
        <Text>댓글</Text>
        <Text style={styles.comment_title_number}>{commentData.length}</Text>
      </View>
      {commentData.length !== 0 ? (
        <View>
          {sort === "all" ? (
            <View style={styles.comment}>
              {commentData.map((item: any) => (
                <View key={item.id}>
                  <CommentItem
                    comment={item}
                    sort={"all"}
                    onReplySubmit={onReplySubmit}
                    likeComment={likeComment}
                    likeReplyComment={likeReplyComment}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.comment}>
              {commentData.slice(0, 1).map((item: any) => (
                <View key={item.id}>
                  <CommentItem comment={item} sort={"best"} />
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View></View>
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
});

export default CommentList;
