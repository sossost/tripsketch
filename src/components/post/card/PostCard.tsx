import { Dimensions } from "react-native";
import React from "react";
import { Post } from "../../../types/Post";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // const isLiked = post.likes.find((like) => like === currentUser.id)
  //   ? true
  //   : false;
  const isLiked = post.isLiked;
  const likeButtonImgPath =
    isLiked === true
      ? require("../../../assets/images/isLikedIcon.png")
      : require("../../../assets/images/isNotLikedIcon.png");
  const userProfilePath = require("../../../assets/images/test_user.png");
  const navigation = useNavigation();

  const postHandler = () => {
    (navigation.navigate as (route: string) => void)("TripDetail");
  };

  return (
    <PostCardLayout>
      <ImageWrapper onPress={postHandler}>
        <Thumnail source={{ uri: post.images[0] }} />
      </ImageWrapper>

      <MetaDataContainer>
        <PostMetaDataContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostLocation>{post.location}</PostLocation>
        </PostMetaDataContainer>

        <ProfileContainer>
          <ProfileWrapper>
            <ProfileImage source={userProfilePath} />
            <UserNickname>{post.nickname}</UserNickname>
          </ProfileWrapper>

          <LikeButton source={likeButtonImgPath} />
        </ProfileContainer>
      </MetaDataContainer>
    </PostCardLayout>
  );
};

export default PostCard;

const PostCardLayout = styled.View`
  position: relative;
  width: ${SCREEN_WIDTH - 42}px;
  background-color: white;
  margin: 0 auto;
  border-radius: 30px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
  elevation: 2;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 30px;
`;

const ImageWrapper = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1.1;
`;

const Thumnail = styled.Image`
  width: 100%;
  height: 100%;
  background-color: gray;
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
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  color: ${colors.mainFont};
`;

const PostLocation = styled.Text`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: #73bbfb;
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

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 100px;
  border-color: #cccccc;
  border-width: 0.5px;
  background-color: gray;
`;

const UserNickname = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

const LikeButton = styled.Image`
  width: 25px;
  height: 25px;
  resize-mode: contain;
`;
