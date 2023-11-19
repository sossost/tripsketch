import { LINK } from "@constants/link";
import { useLikeMutation } from "@hooks/useLikeMutation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Post } from "@types/Post";
import { StackNavigation } from "@types/RootStack";
import { useState } from "react";

const usePostCard = (post: Post) => {
  const route = useRoute<StackNavigation>();
  const navigation = useNavigation<StackNavigation>();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const { handleLikePress } = useLikeMutation(
    isLiked,
    setIsLiked,
    likes,
    setLikes
  );

  const likeButtonImgPath = isLiked
    ? require("@assets/images/isLikedIcon.png")
    : require("@assets/images/isNotLikedIcon.png");
  const commentButtonImgPath = require("@assets/images/commentIcon.png");

  const handlePostPress = () => {
    navigation.navigate(LINK.TRIP_DETAIL_PAGE, { postId: post.id });
  };

  const handleProfilePress = () => {
    if (route.name === LINK.MY_PAGE) return;
    navigation.navigate(LINK.USER_PAGE, { nickname: post.nickname });
  };

  const countryFlag = () => {
    const countryFlagCode = post.countryCode;
    if (!countryFlagCode || countryFlagCode.length !== 2) return null;

    const offset = 127397;
    const emoji = String.fromCodePoint(
      ...post.countryCode
        .toUpperCase()
        .split("")
        .map((char) => char.charCodeAt(0) + offset)
    );

    return emoji;
  };

  return {
    isLiked,
    likes,
    likeButtonImgPath,
    commentButtonImgPath,
    handlePostPress,
    handleProfilePress,
    handleLikePress,
    countryFlag,
  };
};

export default usePostCard;
