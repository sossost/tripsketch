import { styled } from "styled-components/native";
import { Post } from "../../../types/Post";
import UserAvatar from "../user/UserAvatar";
import LikesCount from "../LikesCount";
import CommentsCount from "../CommentsCount";
import { colors } from "../../../constants/color";

interface HorizontalPostCardProps {
  post: Post;
}

const HorizontalPostCard = (props: HorizontalPostCardProps) => {
  const { image, title, content, created_at, likes, comments, user } =
    props.post;

  return (
    <Container>
      <ThumbnailImage
        source={{
          uri: image,
        }}
      />
      <PostBody>
        <CreatedAt>{created_at}</CreatedAt>
        <Title>{title}</Title>
        <Content numberOfLines={1} ellipsizeMode="tail">
          {content}
        </Content>
        <MetaData>
          <UserAvatar profile_img={user.profile_img} nickName={user.nickName} />
          <LikeCommentWrapper>
            <LikesCount likes={likes} variant="small" />
            <CommentsCount comments={comments} variant="small" />
          </LikeCommentWrapper>
        </MetaData>
      </PostBody>
    </Container>
  );
};

export default HorizontalPostCard;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3;
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
  justify-content: center;
  padding: 0 10px;
  flex: 1;
  gap: 3px;
`;

const CreatedAt = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: #d9d9d9;
  position: absolute;
  right: 10px;
  top: 5px;
  z-index: 1;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${colors.mainFont};
`;

const Content = styled.Text`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: ${colors.subFont};
`;

const MetaData = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

const LikeCommentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
