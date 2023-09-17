import React, { useCallback } from "react";
import { useState } from "react";
import { styled } from "styled-components/native";
import { useGetPostsBySearchQuery } from "../../hooks/usePostQuery";

import HorizontalPostFlatList from "../post/HorizontalPostFlatList";
import VariantSelector from "../UI/VariantSelector";
import SearchBar from "../UI/SearchBar";
import AsyncBoundary from "../common/AsyncBoundary";

const ExplorePageComponent = () => {
  const [variant, setVariant] = useState<"인기순" | "최신순">("인기순");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { posts, hasNextPage, fetchNextPage } = useGetPostsBySearchQuery(
    searchQuery,
    variant
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <ExplorePageLayout>
      <SearchBar
        placeholder="검색어를 입력하세요"
        setSearchQuery={setSearchQuery}
      />

      <VariantSelector
        variant1="인기순"
        variant2="최신순"
        initialVariant="인기순"
        variant={variant}
        setVariant={setVariant}
      />

      <AsyncBoundary>
        <HorizontalPostFlatList
          posts={posts}
          handleEndReached={handleEndReached}
        />
      </AsyncBoundary>
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
