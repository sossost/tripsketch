import { Dimensions } from "react-native";
import React from "react";
import { Post } from "../../../types/Post";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { StackNavigation } from "../../../types/RootStack";
import Flag from "react-native-flags";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PostCardProps {
  post: Post;
}

/**
 * @description : 여행일기 카드 컴포넌트
 * @author : 이수현
 * @update : 2023-09-13, 장윤수 : 스타일 에러 수정
 * @version 1.0.1,
 * @see None,
 */
const PostCard = ({ post }: PostCardProps) => {
  // @ts-ignore
  const isLiked = post.isLiked;
  const likeButtonImgPath =
    isLiked === true
      ? require("../../../assets/images/isLikedIcon.png")
      : require("../../../assets/images/isNotLikedIcon.png");
  const commentButtonImgPath = require("../../../assets/comment.png");

  const navigation = useNavigation<StackNavigation>();

  const postHandler = () => {
    navigation.navigate("PostDetail", { postId: post.id });
  };

  return (
    <PostCardLayout>
      <ImageWrapper onPress={postHandler}>
        <Thumnail source={{ uri: post.image }}>
          <ThumnailText>{post.createdAt.slice(0, 10)}</ThumnailText>
        </Thumnail>
      </ImageWrapper>

      <MetaDataContainer>
        <PostMetaDataContainer>
          <PostTitle>
            {post.title.length > 26
              ? post.title.substring(0, 26) + ".."
              : post.title}
          </PostTitle>

          <RowContainer>
            <Flag
              code={post.countryCode?.toUpperCase() || "FRANCE"}
              size={32}
            />
            <PostLocation>{post.country}</PostLocation>
          </RowContainer>
        </PostMetaDataContainer>

        <ProfileContainer>
          <ProfileWrapper>
            <ProfileImageWrapper>
              <ProfileImage source={{ uri: post.profileImage }} />
            </ProfileImageWrapper>
            <UserNickname>{post.nickname}</UserNickname>
          </ProfileWrapper>

          <RowContainer>
            <LikeButton source={likeButtonImgPath} />
            <UserLikes>{post.likes}</UserLikes>

            <CommentButton source={commentButtonImgPath} />
            <UserComments>{post.comments}</UserComments>
          </RowContainer>
        </ProfileContainer>
      </MetaDataContainer>
    </PostCardLayout>
  );
};

export default PostCard;

const PostCardLayout = styled.View`
  position: relative;
  width: ${SCREEN_WIDTH - 40}px;
  background-color: white;
  margin: 0 auto;
  border-radius: 30px;
  flex-direction: column;
  margin-bottom: 30px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const ImageWrapper = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1.1;
  border-radius: 30px;
`;

const Thumnail = styled.ImageBackground`
  width: 100%;
  height: 100%;
  background-color: #bbe7f4;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const ThumnailText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 10;
  right: 10;
`;

const MetaDataContainer = styled.View`
  width: 100%;
  padding: 10px 15px 15px 15px;
`;

const PostMetaDataContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 5px 5px 10px 5px;
  gap: 3px;
  border-bottom-color: #dedede;
  border-bottom-width: 0.5px;
`;

const PostTitle = styled.Text`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: ${colors.mainFont};
`;

const PostLocation = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #73bbfb;
  margin-left: 5px;
`;

const ProfileContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImageWrapper = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 100px;
  border-width: 0.5px;
  border-color: #ccc;
  overflow: hidden;
  background-color: white;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const UserNickname = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
  color: ${colors.subFont};
`;

const UserLikes = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 5px;
  margin-right: 10px;
  color: ${colors.subFont};
`;

const UserComments = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 5px;
  color: ${colors.subFont};
`;

const LikeButton = styled.Image`
  width: 25px;
  height: 25px;
  resize-mode: contain;
`;

const CommentButton = styled.Image`
  width: 25px;
  height: 25px;
  resize-mode: contain;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
