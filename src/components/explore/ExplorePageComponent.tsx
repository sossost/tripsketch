import { useState } from "react";

import VariantSelector from "@components/UI/VariantSelector";
import SearchBar from "@components/UI/SearchBar";
import AsyncBoundary from "@components/common/AsyncBoundary";
import SearchPostList from "@components/explore/SearchPostList";
import PageLayout from "@components/common/PageLayout";

const ExplorePageComponent = () => {
  // 게시물 정렬 기준 상태값
  const [variant, setVariant] = useState<"인기순" | "최신순">("인기순");

  // 검색어 상태값
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <PageLayout>
      <SearchBar
        placeholder="궁금한 여행지를 검색해보세요."
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
        <SearchPostList searchQuery={searchQuery} variant={variant} />
      </AsyncBoundary>
    </PageLayout>
  );
};

export default ExplorePageComponent;
