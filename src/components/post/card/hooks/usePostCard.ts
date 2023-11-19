import { LINK } from "@constants/link";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Post } from "@types/Post";
import { StackNavigation } from "@types/RootStack";

const usePostCard = (post: Post) => {
  const route = useRoute<StackNavigation>();
  const navigation = useNavigation<StackNavigation>();

  const isLiked = post.isLiked;
  const likeButtonImgPath =
    isLiked === true
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

  const handleLikePress = () => {};

  return {
    isLiked,
    likeButtonImgPath,
    commentButtonImgPath,
    handlePostPress,
    handleProfilePress,
  };
};

export default usePostCard;
