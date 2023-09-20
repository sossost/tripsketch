import { FlatList, RefreshControl } from "react-native";
import { Post } from "@types/Post";
import { ReactElement } from "react";

import PostCard from "@components/post/card/PostCard";
import NoneData from "@components/common/NoneData";

interface DiaryListProps {
  posts: Post[];
  handleEndReached: () => void;
  handleRefresh: () => void;
  listHeaderComponent?: ReactElement;
  listFooterComponent?: ReactElement;
}

/**
 * @description : 포스트 리스트 컴포넌트
 *
 * @param posts : 포스트 리스트
 * @param handleEndReached : 스크롤 끝까지 내렸을때 다음페이지 패치하는 핸들러
 * @param listHeaderComponent : 리스트 헤더 컴포넌트
 * @param listFooterComponent : 리스트 푸터 컴포넌트
 *
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.0.1, 플랫리스트 패딩값 수정
 * @see None,
 */
const PostFlatList = ({
  posts,
  handleEndReached,
  handleRefresh,
  listHeaderComponent,
  listFooterComponent,
}: DiaryListProps) => {
  if (posts.length === 0) {
    return <NoneData message="현재 작성된 포스트가 없습니다." />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return <PostCard key={(item as Post).id} post={item as Post} />;
      }}
      alwaysBounceVertical={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      contentContainerStyle={{
        paddingBottom: 30,
        paddingTop: 5,
        paddingHorizontal: 2,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
    />
  );
};

export default PostFlatList;
