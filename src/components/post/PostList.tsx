import { FlatList } from "react-native";
import { Post } from "../../types/Post";
import PostCard from "./card/PostCard";

type DiaryListProps = {
  posts: Post[];
};

const PostList = ({ posts }: DiaryListProps) => {
  return (
    <FlatList
      data={posts}
      renderItem={(trip) => {
        return <PostCard key={trip.item.id} post={trip.item} />;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default PostList;
