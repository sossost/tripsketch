import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";

interface SocialButtonProps {
  isFollowing: boolean;
  onPress: () => Promise<void>;
}

const SocialButton = ({ isFollowing, onPress }: SocialButtonProps) => {
  return (
    <SocialButtonWrapper onPress={onPress} isFollowing={true}>
      <SocialButtonText isFollowing={true}>
        {isFollowing ? "팔로잉" : "팔로우"}
      </SocialButtonText>
    </SocialButtonWrapper>
  );
};

export default SocialButton;

const SocialButtonWrapper = styled.TouchableOpacity<{ isFollowing: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 9999px;
  background-color: ${({ isFollowing }) =>
    isFollowing ? colors.primary : colors.lightGrey};
  border: 1px solid
    ${({ isFollowing }) => (isFollowing ? colors.primary : colors.lightGrey)};
  color: ${({ isFollowing }) => (isFollowing ? colors.white : colors.primary)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialButtonText = styled.Text<{ isFollowing: boolean }>`
  color: ${({ isFollowing }) => (isFollowing ? colors.white : colors.primary)};
  font-size: 14px;
`;
