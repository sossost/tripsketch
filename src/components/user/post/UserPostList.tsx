import { useCallback } from "react";
import { useGetPostsByNickname } from "../../../hooks/usePostQuery";
import PostFlatList from "../../post/PostFlatList";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../react-query/queryKey";

interface UserPostListProps {
  nickname: string;
  category: string;
}

/**
 * @description : 유저 페이지에 보여지는 포스트 리스트 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.0,
 * @see None,
 */
const UserPostList = ({ nickname, category }: UserPostListProps) => {
  const queryClient = useQueryClient();
  // 닉네임과 카테고리를 통해 해당 유저의 게시글을 가져옴
  const { posts, hasNextPage, fetchNextPage } = useGetPostsByNickname(
    nickname,
    category
  );

  // 스크롤 끝에 도달시 다음 페이지 패치하는 핸들러
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY.POSTS, nickname, category]);
  };

  return (
    <PostFlatList
      posts={posts}
      handleEndReached={handleEndReached}
      handleRefresh={handleRefresh}
    />
  );
};

export default UserPostList;
