import { Image, Text, View } from "react-native";
import { colors } from "@constants/color";

interface LikesCountProps {
  likes: number;
  variant?: "small" | "medium" | "large";
}

const LikesCount = ({ likes, variant }: LikesCountProps) => {
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
        source={require("@assets/images/heartOutlineIcon.png")}
        style={{
          width: style.iconSize[variant || "medium"],
          aspectRatio: 1.16,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: colors.subFont,
          fontWeight: "400",
          fontSize: style.fontSize[variant || "medium"],
        }}
      >
        {likes}
      </Text>
    </View>
  );
};

export default LikesCount;

const style = {
  fontSize: {
    small: 13,
    medium: 16,
    large: 24,
  },
  iconSize: {
    small: 13,
    medium: 18,
    large: 26,
  },
};
