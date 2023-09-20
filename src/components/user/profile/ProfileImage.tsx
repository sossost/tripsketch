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
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  overflow: hidden;
  border: 2px solid ${colors.primary};
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
