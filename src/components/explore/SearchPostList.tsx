import { FlatList, RefreshControl } from "react-native";
import { Post } from "../../types/Post";
import { useGetPostsBySearchQuery } from "../../hooks/usePostQuery";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

import HorizontalPostCard from "../post/card/HorizontalPostCard";
import Loading from "../UI/Loading";

interface SearchPostListProps {
  searchQuery: string;
  variant: "인기순" | "최신순";
}

/**
 * @description : 검색어를 통해 검색된 포스트 리스트 컴포넌트
 *
 * @param searchQuery : 검색어
 * @param variant : 최신순, 인기순 variant
 *
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.1.0, 무한 스크롤 패치중 로딩 컴포넌트 추가
 * @see None,
 */
const SearchPostList = ({ searchQuery, variant }: SearchPostListProps) => {
  const queryClient = useQueryClient();
  const { posts, hasNextPage, fetchNextPage } = useGetPostsBySearchQuery(
    searchQuery,
    variant
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY.POSTS, searchQuery, variant]);
  };

  const renderFooter = () => {
    if (hasNextPage) {
      return <Loading />;
    }
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <HorizontalPostCard key={(item as Post).id} post={item as Post} />
        )}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 20,
          paddingHorizontal: 2,
        }}
        alwaysBounceVertical={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        ListFooterComponent={renderFooter()}
      />
    </>
  );
};

export default SearchPostList;
