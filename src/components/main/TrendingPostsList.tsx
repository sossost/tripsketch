import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPostsByTrendingQuery } from "@hooks/usePostQuery";
import { QUERY_KEY } from "@react-query/queryKey";

import PostFlatList from "@components/post/PostFlatList";
import BlueTitle from "@components/UI/BlueTitle";

/**
 * @description : 메인화면에 보여지는 인기있는 포스트 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-18,
 * @version 1.0.0,
 * @see None,
 */
const TrendingPostsList = () => {
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
      listHeaderComponent={
        <BlueTitle text="여행 스케치 둘러보기" isLine={true} />
      }
    />
  );
};

export default TrendingPostsList;
