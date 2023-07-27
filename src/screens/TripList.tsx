import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import PostCard from "../components/post/card/PostCard";
import { Post } from "../types/Post";

const postData: Post[] = [
  {
    id: "35345",
    title: "프랑스 2일차 여행일기",
    content:
      "<div><p>파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ 그런데 ! 파리를 n번째 여행하고 나서의 지금은 ~ 가장 좋았던 여행지중에 파리가 베스트 순위에 든답니닷 :) </p><img src='http://placehold.it/420x200' /><p>너무 좋았습니다. 꼭 방문해보세요. 마지막 사진 남기고 이만 가보겠습니다!!</p><img src='https://source.unsplash.com/random'><p>끝입니다!!</p></div>",
    likes: ["apple34234", "1234"],
    views: 24,
    loaction: ["2342342", "2342142"],
    start_at: "2023-05-06",
    end_at: "2023-05-12",
    hashtag: ["프랑스", "해외여행"],
    created_at: "2023-04-03",
    user: {
      id: "1234",
      nickName: "파란하늘",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
  },
  {
    id: "35347",
    title: "프랑스 3일차 여행일기",
    content:
      "<div><p>파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ 그런데 ! 파리를 n번째 여행하고 나서의 지금은 ~ 가장 좋았던 여행지중에 파리가 베스트 순위에 든답니닷 :) </p><img src='http://placehold.it/420x200' /><p>너무 좋았습니다. 꼭 방문해보세요. 마지막 사진 남기고 이만 가보겠습니다!!</p><img src='https://source.unsplash.com/random'><p>끝입니다!!</p></div>",
    likes: ["qfe123", "dger123", "apple34234", "1234", "213213"],
    views: 24,
    loaction: ["2342342", "2342142"],
    start_at: "2023-05-06",
    end_at: "2023-05-12",
    hashtag: ["프랑스", "해외여행"],
    created_at: "2023-04-01",
    user: {
      id: "1234",
      nickName: "파란하늘",
      profile_img: "https://reactnative.dev/img/tiny_logo.png",
    },
  },
];

const TripList = ({ navigation }: any) => {
  const [data, setData] = useState(postData);
  const [selectFilter, setSelectFilter] = useState("인기순");

  const filterData = (filter: string) => {
    setSelectFilter(filter);

    if (filter === "인기순") {
      setData(data.sort((a, b) => b.likes.length - a.likes.length));
    } else if (filter === "최신순") {
      setData(
        data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.search} placeholder="검색" />
      <View style={styles.filter}>
        <TouchableOpacity
          style={styles.filter_btn}
          onPress={() => filterData("인기순")}
        >
          <Text
            style={[
              styles.filter_btn_common,
              selectFilter === "인기순"
                ? styles.filter_btn_text
                : styles.filter_btn_text_unSelect,
            ]}
          >
            인기순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filter_btn}
          onPress={() => filterData("최신순")}
        >
          <Text
            style={[
              styles.filter_btn_common,
              selectFilter === "최신순"
                ? styles.filter_btn_text
                : styles.filter_btn_text_unSelect,
            ]}
          >
            최신순
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {data.map((item) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <Button
        title="Go to Mypage"
        onPress={() => navigation.navigate("TripDetail")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  search: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#91BBF8",
    borderRadius: 5,
    padding: 10,
  },
  filter: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 6,
  },
  filter_btn: {
    width: "50%",
  },
  filter_btn_common: {
    paddingVertical: 10,
  },
  filter_btn_text: {
    textAlign: "center",
    backgroundColor: "#73BBFB",
    color: "#fff",
  },
  filter_btn_text_unSelect: {
    textAlign: "center",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
});
export default TripList;
