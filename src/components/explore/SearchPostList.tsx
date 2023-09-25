import { useGetPostsBySearchQuery } from "@hooks/usePostQuery";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";

import Loading from "@components/UI/Loading";
import HorizontalPostFlatList from "@components/post/HorizontalPostFlatList";
import NoneData from "@components/common/NoneData";
import { Keyboard } from "react-native";

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
 * @update : 2023-09-22,
 * @version 1.2.0, 검색페이지 keyboard dismiss 추가
 * @see None,
 */
const SearchPostList = ({ searchQuery, variant }: SearchPostListProps) => {
  const queryClient = useQueryClient();

  // 검색어를 통해 검색된 포스트 리스트 커스텀 훅
  const { posts, hasNextPage, fetchNextPage } = useGetPostsBySearchQuery(
    searchQuery,
    variant
  );

  /** 스크롤 끝에 닿을시 다음 데이터 요청하는 핸들러 */
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  /** 리스트 아래로 당기면 데이터 리프레쉬 하는 핸들러 */
  const handleRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY.POSTS, searchQuery, variant]);
  };

  /** 무한 스크롤 데이터 패치중 렌더링하는 로딩 컴포넌트 */
  const renderFooter = () => {
    if (hasNextPage) {
      return <Loading />;
    }
  };

  if (!posts.length)
    return (
      <NoneData
        message="검색 결과가 없습니다."
        onPress={() => Keyboard.dismiss()}
      />
    );

  return (
    <HorizontalPostFlatList
      posts={posts}
      handleEndReached={handleEndReached}
      handleRefresh={handleRefresh}
      listFooterComponent={renderFooter()}
    />
  );
};

export default SearchPostList;
