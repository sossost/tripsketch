import { Text, View } from "react-native";
import { Image } from "react-native";
import { colors } from "../../../constants/color";

interface UserAvatar {
  profile_img: string;
  nickName: string;
}

const UserAvatar = ({ profile_img, nickName }: UserAvatar) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Image
        style={{ width: 20, height: 20, borderRadius: 9999 }}
        source={{
          uri: profile_img,
        }}
      />
      <Text
        style={{
          fontSize: 14,
          color: colors.subFont,
          fontWeight: "500",
        }}
      >
        {nickName}
      </Text>
    </View>
  );
};

export default UserAvatar;
