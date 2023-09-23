import { colors } from "@constants/color";
import { TouchableOpacityProps } from "react-native";
import { styled } from "styled-components/native";

interface ProfileImageProps extends TouchableOpacityProps {
  profileImage: string;
}

const ProfileImage = ({ profileImage, ...props }: ProfileImageProps) => {
  return (
    <ProfileImgWrapper {...props}>
      <ProfileImg source={{ uri: profileImage }} />
    </ProfileImgWrapper>
  );
};

export default ProfileImage;

const ProfileImgWrapper = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProfileImg = styled.Image`
  width: 34px;
  height: 34px;
  object-fit: contain;
`;
