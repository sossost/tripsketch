import { useCallback } from "react";
import { useGetSubscribedUsersPosts } from "../../hooks/usePostQuery";

import PostFlatList from "../post/PostFlatList";
import MoreTripsButton from "./MoreTripsButton";

/**
 * @description : 메인화면에 보여지는 구독한 유저들의 포스트 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const SubscribedPostsList = () => {
  // 구독한 유저들의 포스트 리스트, 무한스크롤 관련 로직을 가져옴
  const { posts, hasNextPage, fetchNextPage } = useGetSubscribedUsersPosts();

  // 스크롤 끝에 도달시 다음 페이지 패치하는 핸들러
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <PostFlatList
      posts={posts}
      handleEndReached={handleEndReached}
      listFooterComponent={<MoreTripsButton />}
    />
  );
};

export default SubscribedPostsList;
