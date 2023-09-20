import { FlatList } from "react-native";
import { Post } from "@types/Post";
import { ReactElement } from "react";
import { RefreshControl } from "react-native-gesture-handler";

import HorizontalPostCard from "@components/post/card/HorizontalPostCard";

interface DiaryListProps {
  posts: Post[];
  handleEndReached: () => void;
  handleRefresh: () => void;
  listHeaderComponent?: ReactElement;
  listFooterComponent?: ReactElement;
}

/**
 * @description : 수평 카드 포스트 리스트 컴포넌트
 *
 * @param posts : 포스트 리스트
 * @param handleEndReached : 스크롤 끝까지 내렸을때 다음페이지 패치하는 핸들러
 * @param handleRefresh : 리스트 아래로 당기면 데이터 리프레쉬 하는 핸들러
 * @param listHeaderComponent : 리스트 헤더 컴포넌트
 * @param listFooterComponent : 리스트 푸터 컴포넌트
 *
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.1.0, 리프레시 핸들러 추가
 * @see None,
 */
const HorizontalPostFlatList = ({
  posts,
  handleEndReached,
  handleRefresh,
  listHeaderComponent,
  listFooterComponent,
}: DiaryListProps) => {
  return (
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
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
    />
  );
};

export default HorizontalPostFlatList;
