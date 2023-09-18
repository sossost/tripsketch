import { FlatList, RefreshControl, View } from "react-native";
import { Post } from "../../types/Post";
import { ReactElement } from "react";

import PostCard from "./card/PostCard";
import { styled } from "styled-components/native";

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
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const PostFlatList = ({
  posts,
  handleEndReached,
  handleRefresh,
  listHeaderComponent,
  listFooterComponent,
}: DiaryListProps) => {
  posts;
  return (
    <Container>
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
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
      />
    </Container>
  );
};

const Container = styled.View`
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 1.5px;
  shadow-offset: 0px 0px;
  elevation: 2;
`;

export default PostFlatList;
