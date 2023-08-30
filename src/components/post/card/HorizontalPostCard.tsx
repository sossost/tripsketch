import { styled } from "styled-components/native";
import { Post } from "../../../types/Post";
import { colors } from "../../../constants/color";
import { useGetUserByNickname } from "../../../hooks/useUserQuery";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UserAvatar from "../user/UserAvatar";
import LikesCount from "../LikesCount";
import CommentsCount from "../CommentsCount";

interface HorizontalPostCardProps {
  post: Post;
  postId: string;
}

const HorizontalPostCard = ({ post, postId }: HorizontalPostCardProps) => {
  const userProfileImage = useGetUserByNickname(post.nickname).data
    ?.profileImageUrl;

  const navigation = useNavigation();
  const handlePostDetailPress = () => {
    (navigation.navigate as (route: string) => void)("TripDetail", { postId });
  };

  return (
    <Naviagation onPress={handlePostDetailPress}>
      <Container>
        <ThumbnailImage
          source={{
            uri: post.images[0],
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
              profile_img={userProfileImage}
              nickName={post.nickname}
            />
            <LikeCommentWrapper>
              <LikesCount likes={post.likes} variant="small" />
              <CommentsCount comments={post.views} variant="small" />
            </LikeCommentWrapper>
          </MetaData>
        </PostBody>
      </Container>
    </Naviagation>
  );
};

export default HorizontalPostCard;

const Naviagation = styled.TouchableOpacity`
  width: 100%;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
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
`;

const Content = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: ${colors.subFont};
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
