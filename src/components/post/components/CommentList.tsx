import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
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
  {
    id: "34523",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
  {
    id: "345123",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
  {
    id: "354222",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
  {
    id: "7653",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
  {
    id: "46222",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
  {
    id: "867",
    comment: "공유 감사합니다!!!",
    create_at: "2023-06-23",
    like: ["good23211", "wego2311", "dd123"],
  },
];

const CommentList = ({ sort }: { sort: string }) => {
  const [comment, setComment] = useState<Comment[]>(commentData);

  return (
    <View style={styles.container}>
      <View style={styles.comment_title}>
        <Text>댓글</Text>
        <Text style={styles.comment_title_number}>{commentData.length}</Text>
      </View>
      {sort === "all" ? (
        <View style={styles.comment}>
          {comment.map((item) => (
            <View key={item.id}>
              <CommentItem comment={item} sort={"all"} />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.comment}>
          {comment.slice(0, 1).map((item) => (
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
