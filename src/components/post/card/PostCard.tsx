import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { StackNavigation } from "../../../types/RootStack";
import { Post } from "../../../types/Post";
import { colors } from "@constants/color";
import { LINK } from "@constants/link";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import Flag from "react-native-flags";

interface PostCardProps {
  post: Post;
}
const DEFAULT_IMAGE =
  "https://ax6izwmsuv9c.objectstorage.ap-osaka-1.oci.customer-oci.com/n/ax6izwmsuv9c/b/tripsketch/o/profile.png";

/**
 * @description : 여행일기 카드 컴포넌트
 * @author : 이수현
 * @update : 2023-09-19,
 * @version 1.1.2, 장윤수 : 터치시 opacity 효과 제거 및 마이페이지인 경우 프로필 클릭 이벤트 제거
 * @see None,
 */
const PostCard = ({ post }: PostCardProps) => {
  const route = useRoute<StackNavigation>();

  const isLiked = post.isLiked;
  const likeButtonImgPath =
    isLiked === true
      ? require("@assets/images/isLikedIcon.png")
      : require("@assets/images/isNotLikedIcon.png");
  const commentButtonImgPath = require("@assets/images/commentIcon.png");

  const navigation = useNavigation<StackNavigation>();

  const postHandleClick = () => {
    navigation.navigate(LINK.TRIP_DETAIL_PAGE, { postId: post.id });
  };

  const handleProfileClick = () => {
    if (route.name === LINK.MY_PAGE) return;
    navigation.navigate(LINK.USER_PAGE, { nickname: post.nickname });
  };

  return (
    <PostCardLayout onPress={postHandleClick} activeOpacity={1}>
      <ImageWrapper>
        <Thumnail source={{ uri: post.image || DEFAULT_IMAGE }}>
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
            <Flag code={post.countryCode?.toUpperCase()} size={32} />
            <PostLocation>{post.country}</PostLocation>
          </RowContainer>
        </PostMetaDataContainer>

        <ProfileContainer>
          <ProfileWrapper onPress={handleProfileClick}>
            <ProfileImageWrapper>
              <ProfileImage source={{ uri: post.profileImageUrl }} />
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

const PostCardLayout = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH - 44}px;
  background-color: white;
  border-radius: 30px;
  margin-bottom: 30px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 1.5px;
  shadow-offset: 0px 0px;
  elevation: 2;
`;

const ImageWrapper = styled.View`
  width: 100%;
  aspect-ratio: 1.1;
  overflow: hidden;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
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
  bottom: 10px;
  right: 10px;
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
  color: ${colors.primary};
  margin-left: 5px;
`;

const ProfileContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ProfileImageWrapper = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 100px;

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
