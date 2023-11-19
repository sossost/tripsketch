import { styled } from "styled-components/native";
import { Post } from "../../../types/Post";
import { colors } from "../../../constants/color";
import { Dimensions, View } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

import UserAvatar from "../user/UserAvatar";
import LikesCount from "../LikesCount";
import CommentsCount from "../CommentsCount";
import usePostCard from "./hooks/usePostCard";

interface HorizontalPostCardProps {
  post: Post;
}

const DEFAULT_IMAGE =
  "https://ax6izwmsuv9c.objectstorage.ap-osaka-1.oci.customer-oci.com/n/ax6izwmsuv9c/b/tripsketch/o/profile.png";

const HorizontalPostCard = ({ post }: HorizontalPostCardProps) => {
  const { handlePostPress } = usePostCard(post);

  return (
    <Container onPress={handlePostPress}>
      <ThumbnailImage
        source={{
          uri: post.image || DEFAULT_IMAGE,
        }}
      />
      <PostBody>
        <View>
          <RowView>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {post.title}
            </Title>
            <CreatedAt>{post.createdAt.slice(0, 10)}</CreatedAt>
          </RowView>
          <Content numberOfLines={1} ellipsizeMode="tail">
            {post.content}
          </Content>
        </View>
        <MetaData>
          <UserAvatar
            profile_img={post.profileImageUrl}
            nickName={post.nickname}
          />
          <LikeCommentWrapper>
            <LikesCount likes={post.likes} variant="small" />
            <CommentsCount comments={post.comments} variant="small" />
          </LikeCommentWrapper>
        </MetaData>
      </PostBody>
    </Container>
  );
};

export default HorizontalPostCard;

const Container = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH - 44}px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.25;
  elevation: 2;
`;

const ThumbnailImage = styled.Image`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
`;

const PostBody = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px 8px 10px;
  flex: 1;
  gap: 3px;
`;

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const CreatedAt = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #d9d9d9;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.mainFont};
  margin-bottom: 5px;
  width: 75%;
  line-height: 20px;
`;

const Content = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${colors.subFont};
  margin-top: -2px;
`;

const MetaData = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeCommentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
