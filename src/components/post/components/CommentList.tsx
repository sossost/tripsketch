import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { Comment } from "../../../types/comment";
import { getPostCommentList } from "../../../hooks/useCommentQuery";

type CommentProps = {
  onSubmit?: (comment: string, parentId?: string) => void;
  sort: string;
};

const CommentList = ({ sort, onSubmit }: CommentProps) => {
  const { commentData, isLoading, isError } = getPostCommentList();

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
      {sort === "all" ? (
        <View style={styles.comment}>
          {commentData.map((item: any) => (
            <View key={item.id}>
              <CommentItem comment={item} sort={"all"} onSubmit={onSubmit} />
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
