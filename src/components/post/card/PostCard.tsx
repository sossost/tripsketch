import { Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { StackNavigation } from "../../../types/RootStack";
import { Post } from "../../../types/Post";
import { LINK } from "../../../constants/link";
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
 * @update : 2023-09-14, 장윤수 : 스타일 에러 수정
 * @version 1.0.1,
 * @see None,
 */
const PostCard = ({ post }: PostCardProps) => {
  const isLiked = post.isLiked;
  const likeButtonImgPath =
    isLiked === true
      ? require("../../../assets/images/isLikedIcon.png")
      : require("../../../assets/images/isNotLikedIcon.png");
  const commentButtonImgPath = require("../../../assets/comment.png");

  const navigation = useNavigation<StackNavigation>();

  const postHandler = () => {
    navigation.navigate(LINK.TRIP_DETAIL_PAGE, { postId: post.id });
  };

  return (
    <PostCardLayout>
      <ImageWrapper onPress={postHandler}>
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

const PostCardLayout = styled.View`
  width: ${SCREEN_WIDTH - 50}px;
  background-color: white;
  border-radius: 30px;
  margin-bottom: 30px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 1.5px;
  shadow-offset: 0px 0px;
  elevation: 2;
`;

const ImageWrapper = styled.TouchableOpacity`
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

const post = {
  content: "가다다다두둗두ㅏㄷ",
  createdAt: "2023-09-17T06:38:24.428",
  deletedAt: null,
  endAt: "2023-09-07",
  hashtag: ["대한민국", "서울", "덕수궁", "세종대로"],
  id: "65069ee046b63664e4ec26b0",
  images: [
    "https://ax6izwmsuv9c.objectstorage.ap-osaka-1.oci.customer-oci.com/n/ax6izwmsuv9c/b/tripsketch/o/trip-sketching/20230917063819aW1hZ2Uw.jpg",
  ],
  isHidden: false,
  isLiked: false,
  isPublic: true,
  latitude: 37.56655399646471,
  likes: 0,
  location: "대한민국",
  longitude: 126.97684999555348,
  nickname: "ynnsuis",
  startedAt: "2023-09-01",
  title: "글작성입니자.",
  updatedAt: null,
  views: 0,
};

const trips = {
  comments: 0,
  country: "",
  countryCode: "",
  createdAt: "2023-09-16T09:54:58.772",
  id: "65057b728363d91ae559c383",
  image: null,
  isLiked: true,
  likes: 1,
  nickname: "박짱구구",
  profileImageUrl:
    "https://ax6izwmsuv9c.objectstorage.ap-osaka-1.oci.customer-oci.com/n/ax6izwmsuv9c/b/tripsketch/o/profile.png",
  title: "글 작성 - 0916 - 05",
  views: 0,
};
