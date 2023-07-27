import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { Comment } from "../../../types/comment";

const commentData: Comment[] = [
  {
    id: "123345",
    userNickName: "파란하늘",
    userProfileUrl: "https://reactnative.dev/img/tiny_logo.png",
    tripId: "35345",
    parentId: "",
    content: "안녕안녕앙녕~볶음밥이랑 같이 먹으면 더 맛있어요.",
    createdAt: "2023-04-03",
    updatedAt: "2023-04-03",
    likes: 10,
    likedBy: ["ks2323", "wego2311"],
    replyTo: "",
    children: [
      {
        id: "64bf8e05ac09d34b52c7f2be",
        userNickName: "다람쥐",
        userProfileUrl: "https://source.unsplash.com/random/300×300",
        tripId: "35345",
        parentId: "123345",
        content: "우와 짱입니다! 흐핳하",
        createdAt: "2015-03-02",
        updatedAt: "",
        likes: 1,
        likedBy: ["sad1123", "happy12"],
        replyTo: "파란하늘",
        children: [],
      },
      {
        id: "64bf8e05ac09d34b52c7f2342",
        userNickName: "효은아빠",
        userProfileUrl: "https://source.unsplash.com/random/300×300",
        tripId: "35345",
        parentId: "123345",
        content: "으음 그런가요?",
        createdAt: "2015-03-02",
        updatedAt: "",
        likes: 1,
        likedBy: ["sad1123", "happy12", "1234"],
        replyTo: "파란하늘",
        children: [],
      },
    ],
  },
  {
    id: "335345",
    userNickName: "초록바다",
    userProfileUrl: "https://reactnative.dev/img/tiny_logo.png",
    tripId: "35345",
    parentId: "",
    content: "흐음.. 좋아보이긴 함ㅋㅋ",
    createdAt: "2023-04-13",
    updatedAt: "2023-04-03",
    likes: 10,
    likedBy: ["ks2323", "wego2311", "1234"],
    replyTo: "",
    children: [
      {
        id: "64bf8e05ac09d34b52c7f2be",
        userNickName: "다람쥐",
        userProfileUrl: "https://source.unsplash.com/random/300×300",
        tripId: "35345",
        parentId: "335345",
        content: "오잉..?",
        createdAt: "2022-03-02",
        updatedAt: "",
        likes: 1,
        likedBy: ["sad1123"],
        replyTo: "초록바다",
        children: [],
      },
    ],
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
