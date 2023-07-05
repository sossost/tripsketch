import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState } from "react";
import { Post } from "../../types/Post";
import { CommonStyles } from "../../styles/CommonStyles";
import { Ionicons } from "@expo/vector-icons";
import { MixedStyleDeclaration } from "react-native-render-html";
import RenderHtml from "react-native-render-html";

const postData: Post = {
  id: "35345",
  title: "프랑스 2일차 여행일기",
  content:
    "<div><p>파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ 그런데 ! 파리를 n번째 여행하고 나서의 지금은 ~ 가장 좋았던 여행지중에 파리가 베스트 순위에 든답니닷 :) </p><img src='http://placehold.it/420x200' /><p>너무 좋았습니다. 꼭 방문해보세요. 마지막 사진 남기고 이만 가보겠습니다!!</p><img src='https://source.unsplash.com/random'></div>",
  likes: ["qfe123", "dger123", "apple34234"],
  views: 24,
  loaction: ["2342342", "2342142"],
  start_at: "2023-05-06",
  end_at: "2023-05-12",
  hashtag: ["프랑스", "해외여행"],
  created_at: "2023-04-03",
};

const PostView = () => {
  const [post, setPost] = useState<Post>(postData);
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={[CommonStyles.appContainer, styles.container]}>
      <View style={styles.title_container}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.ellipsis}>
          <Ionicons name="ellipsis-vertical" size={24} color="#9f9f9f" />
        </View>
      </View>
      <View style={styles.tag_container}>
        {post.hashtag.map((item, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tag_text}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.date_container}>
        <View style={styles.trip_date_container}>
          <Text style={styles.trip_date_text}>여행 일정</Text>
          <Text style={styles.trip_date_period}>
            {post.start_at} ~ {post.end_at}
          </Text>
        </View>
        <View style={styles.trip_date_container}>
          <Text style={styles.trip_date_text}>작성일</Text>
          <Text style={styles.trip_date_period}>{post.created_at}</Text>
        </View>
      </View>
      <RenderHtml
        source={{ html: post.content }}
        contentWidth={deviceWidth}
        tagsStyles={tagStyles}
      />
      <View style={styles.likeView_container}>
        <View style={styles.likes}>
          <View>
            <Ionicons name="heart-outline" size={22} color="#9f9f9f" />
          </View>
          <Text style={styles.likeView_text}>{post.likes.length}</Text>
        </View>
        <View style={styles.views}>
          <View>
            <Ionicons name="eye-outline" size={22} color="#9f9f9f" />
          </View>
          <Text style={styles.likeView_text}>{post.views}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title_container: {
    position: "relative",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    width: "90%",
  },
  ellipsis: {
    position: "absolute",
    right: 0,
  },
  tag_container: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  tag: {
    borderColor: "#73BBFB",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  tag_text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#73BBFB",
  },
  date_container: {
    marginTop: 15,
    backgroundColor: "#f7f7f7",
    padding: 13,
  },
  trip_date_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  trip_date_text: {
    fontSize: 13,
    width: "25%",
    fontWeight: "600",
  },
  trip_date_period: {
    fontSize: 13,
  },
  likeView_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 13,
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
  },
});

const tagStyles: Record<string, MixedStyleDeclaration> = {
  p: {
    fontSize: 16,
    lineHeight: 25,
    color: "#333",
  },
  img: {
    width: "100%",
    height: "auto",
    resizeMode: "contain",
  },
};

export default PostView;
