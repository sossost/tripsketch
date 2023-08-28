import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { colors } from "../../constants/color";

interface CommentsCountProps {
  comments: number;
  variant?: "small" | "medium" | "large";
}

const CommentsCount = ({ comments, variant }: CommentsCountProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Image
        source={require("../../assets/images/commentIcon.png")}
        style={{
          width: style.iconSize[variant || "medium"],
          aspectRatio: 1,
        }}
      />
      <Text
        style={{
          color: colors.subFont,
          fontWeight: "400",
          fontSize: style.fontSize[variant || "medium"],
        }}
      >
        {comments}
      </Text>
    </View>
  );
};

export default CommentsCount;

const style = {
  fontSize: {
    small: 13,
    medium: 16,
    large: 24,
  },
  iconSize: {
    small: 11,
    medium: 18,
    large: 26,
  },
};
