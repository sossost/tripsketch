import { StyleSheet, Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { Comment } from "../../../types/comment";

const commentData: Comment[] = [
  {
    id: "123345",
    comment: "안녕안녕앙녕~볶음밥이랑 같이 먹으면 더 맛있어요.",
    create_at: "2023-04-03",
    like: ["ks2323", "wego2311"],
    user: {
      id: "1234",
      nickName: "파란하늘",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
    children: [
      {
        parentId: "1234",
        comment_id: "12322",
        created_at: "2015-03-02",
        content: "우와 짱입니다! 흐핳하",
        user: {
          id: "123324",
          nickName: "다람쥐",
          profile_img: "https://source.unsplash.com/random/300×300",
        },
        likes: 1,
        liked_user_list: ["sad1123", "happy12"],
        toReply: "파란하늘",
      },
      {
        parentId: "1234",
        comment_id: "12342234",
        created_at: "2015-03-03",
        content: "으음 그런가요?",
        user: {
          id: "122434",
          nickName: "효은아빠",
          profile_img: "https://source.unsplash.com/random/300×300",
        },
        likes: 0,
        liked_user_list: [],
        toReply: "다람쥐",
      },
    ],
  },
  {
    id: "121312",
    comment: "너무 좋아보여요! 저도 다음주 주말에 방문하기로 했습니다.",
    create_at: "2023-04-03",
    like: ["ks2323", "wego2311", "gogo1222", "das123"],
    user: {
      id: "12341231",
      nickName: "고구마",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
    children: [
      {
        parentId: "12341231",
        comment_id: "12322",
        created_at: "2015-03-02",
        content: "부러워요. 다녀오세요",
        user: {
          id: "123324",
          nickName: "다람쥐",
          profile_img: "https://source.unsplash.com/random/300×300",
        },
        likes: 1,
        liked_user_list: ["sad1123", "happy12"],
        toReply: "고구마",
      },
    ],
  },
  {
    id: "121322",
    comment: "우와 멋져요",
    create_at: "2023-04-03",
    like: ["ks2323"],
    user: {
      id: "234224",
      nickName: "도토리",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
    children: [],
  },
  {
    id: "143242",
    comment: "우와 멋져요",
    create_at: "2023-04-23",
    like: ["ks2323"],
    user: {
      id: "213231",
      nickName: "감자",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
    children: [],
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
