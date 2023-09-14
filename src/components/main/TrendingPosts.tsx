import { useCallback } from "react";

import PostFlatList from "../post/PostFlatList";

// API 연결시 구현 예정
const TrendingPosts = () => {
  const { posts = [], hasNextPage = false, fetchNextPage = () => {} } = {};

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return <PostFlatList posts={posts} handleEndReached={handleEndReached} />;
};

export default TrendingPosts;
