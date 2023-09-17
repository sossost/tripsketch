import { FlatList, RefreshControl } from "react-native";
import { Post } from "../../types/Post";
import { useGetPostsBySearchQuery } from "../../hooks/usePostQuery";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

import HorizontalPostCard from "../post/card/HorizontalPostCard";

interface SearchPostListProps {
  searchQuery: string;
  variant: "인기순" | "최신순";
}

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
      />
    </>
  );
};

export default SearchPostList;
