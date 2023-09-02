import React from "react";
import { FlatList, Text } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/queryKey";
import { getPostsByNickname } from "../services/post";
import { styled } from "styled-components/native";

import VariantSelector from "./UI/VariantSelector";
import Loading from "./UI/Loading";
import HorizontalPostCard from "./post/card/HorizontalPostCard";

const ExplorePageComponent = () => {
  const [variant, setVariant] = useState<"인기순" | "최신순">("인기순");

  // const { PostSearchBar, posts, isLoading, isError } = usePostSearch(variant);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery([QUERY_KEY.POSTS], () =>
    getPostsByNickname("박짱구", "전체보기")
  );

  return (
    <ExplorePageLayout>
      {/* <PostSearchBar /> */}
      <VariantSelector
        variant1="인기순"
        variant2="최신순"
        initialVariant="인기순"
        variant={variant}
        setVariant={setVariant}
      />
      <>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Text>Something Wrong!</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={(post) => <HorizontalPostCard post={post.item} />}
            keyExtractor={(post) => post.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 20,
              paddingHorizontal: 2,
            }}
          />
        )}
      </>
    </ExplorePageLayout>
  );
};

export default ExplorePageComponent;

const ExplorePageLayout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  padding: 20px;
  padding-top: 40px;
  gap: 15px;
`;
