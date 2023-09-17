import { useCallback } from "react";

import PostFlatList from "../post/PostFlatList";
import { useGetPostsByTrendingQuery } from "../../hooks/usePostQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

/**
 * @description : 메인화면에 보여지는 인기있는 포스트 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-18,
 * @version 1.0.0,
 * @see None,
 */
const TrendingPosts = () => {
  const queryClient = useQueryClient();
  const { posts, hasNextPage, fetchNextPage } = useGetPostsByTrendingQuery();

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY.POSTS, QUERY_KEY.TRENDING]);
  };

  return (
    <PostFlatList
      posts={posts}
      handleEndReached={handleEndReached}
      handleRefresh={handleRefresh}
    />
  );
};

export default TrendingPosts;
