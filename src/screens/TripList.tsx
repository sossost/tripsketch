import React from "react";
import { Text, View } from "react-native";
import { useState } from "react";
import { Post } from "../types/Post";
import { usePostSearch } from "../hooks/usePostSearch";
import VariantSelector from "../components/UI/VariantSelector";
import Loading from "../components/UI/Loading";
import HorizontalPostCard from "../components/post/card/HorizontalPostCard";

const postData: Post[] = [
  {
    id: "35345",
    image: "https://source.unsplash.com/random",
    title: "프랑스 2일차 여행일기",
    content:
      "파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ 그런데 ! 파리를 n번째 여행하고 나서의 지금은 ~ 가장 좋았던 여행지중에 파리가 베스트 순위에 든답니닷 :) </p><img src='http://placehold.it/420x200' /><p>너무 좋았습니다. 꼭 방문해보세요. 마지막 사진 남기고 이만 가보겠습니다!!",
    likes: ["apple34234", "1234"],
    views: 24,
    comments: ["qfe123", "dger123", "apple34234", "1234", "213213"],
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
    image: "https://source.unsplash.com/random",
    title: "프랑스 3일차 여행일기",
    content:
      "<div><p>파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ 그런데 ! 파리를 n번째 여행하고 나서의 지금은 ~ 가장 좋았던 여행지중에 파리가 베스트 순위에 든답니닷 :) </p><img src='http://placehold.it/420x200' /><p>너무 좋았습니다. 꼭 방문해보세요. 마지막 사진 남기고 이만 가보겠습니다!!</p><img src='https://source.unsplash.com/random'><p>끝입니다!!</p></div>",
    likes: ["qfe123", "dger123", "apple34234", "1234", "213213"],
    views: 24,
    comments: ["qfe123", "dger123", "apple34234", "1234", "213213"],
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
  const [variant, setVariant] = useState<"인기순" | "최신순">("인기순");

  const { PostSearchBar, posts, isLoading, isError } = usePostSearch(variant);

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
      }}
    >
      <PostSearchBar />
      <VariantSelector
        variant1="인기순"
        variant2="최신순"
        initialVariant="인기순"
        variant={variant}
        setVariant={setVariant}
      />
      <View>
        {/* {isLoading ? (
          <Loading />
        ) : isError ? (
          <Text>Something Wrong!</Text>
        ) : ( */}
        <View style={{ marginTop: 20 }}>
          <HorizontalPostCard post={postData[0]} />
        </View>
        {/* )} */}
      </View>
    </View>
  );
};

export default TripList;
