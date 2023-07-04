import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { Comment } from "../../../types/comment";

const commentData = [
  {
    id: "123345",
    comment: "안녕안녕앙녕~볶음밥이랑 같이 먹으면 더 맛있어요.",
    create_at: "2023-04-03",
    like: ["ks2323", "wego2311"],
  },
  {
    id: "1456456",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
];

const CommentList = () => {
  const [comment, setComment] = useState<Comment[]>(commentData);

  return (
    <View style={styles.container}>
      <Text>댓글</Text>
      <View style={styles.comment}>
        {comment.map((item) => (
          <View key={item.id}>
            <CommentItem comment={item} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  comment: {},
});

export default CommentList;
