import { useCallback } from "react";
import { useGetSubscribedUsersPosts } from "../../hooks/usePostQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";

import PostFlatList from "../post/PostFlatList";
import MoreTripsButton from "./MoreTripsButton";
import TrendingPosts from "./TrendingPostsList";
import BlueTitle from "@components/UI/BlueTitle";

/**
 * @description : 메인화면에 보여지는 구독한 유저들의 포스트 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.1.0, 리스트 헤더 컴포넌트 추가
 * @see None,
 */
const SubscribedPostsList = () => {
  const queryClient = useQueryClient();
  // 구독한 유저들의 포스트 리스트, 무한스크롤 관련 로직을 가져옴
  const { posts, hasNextPage, fetchNextPage } = useGetSubscribedUsersPosts();

  // 스크롤 끝에 도달시 다음 페이지 패치하는 핸들러
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleRefresh = () => {
    queryClient.invalidateQueries([
      QUERY_KEY.POSTS,
      QUERY_KEY.SUBSCRIPTED_USERS,
    ]);
  };

  if (!posts) return <TrendingPosts />;

  return (
    <PostFlatList
      posts={posts}
      handleEndReached={handleEndReached}
      handleRefresh={handleRefresh}
      listFooterComponent={<MoreTripsButton />}
      listHeaderComponent={<BlueTitle text={"내가 구독하는 여행자의 스케치"} />}
    />
  );
};

export default SubscribedPostsList;
