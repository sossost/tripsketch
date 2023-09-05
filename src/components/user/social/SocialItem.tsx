import { User } from "../../../types/user";
import { styled } from "styled-components/native";
import { LINK } from "../../../constants/link";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";

import SocialButton from "./SocialButton";

type SocialItemProps = {
  user: User;
  isFollowing: boolean | undefined;
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
};

const SocialItem = ({
  user,
  isFollowing = false,
  followBtnHandler,
}: SocialItemProps) => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <SocialItemContainer>
      <ProfileWrapper
        onPress={() =>
          navigation.navigate(LINK.USER_PAGE, {
            nickname: user.nickname,
          })
        }
      >
        <ProfileImageWrapper>
          <ProfileImage source={{ uri: user.profileImageUrl }} />
        </ProfileImageWrapper>
        <ProfileTextWrapper>
          <Nickname>{user.nickname}</Nickname>
          <Introduction>{user.introduction}</Introduction>
        </ProfileTextWrapper>
      </ProfileWrapper>
      <SocialButton
        isFollowing={isFollowing}
        onPress={() => followBtnHandler(user.nickname, isFollowing)}
      />
    </SocialItemContainer>
  );
};

export default SocialItem;

const SocialItemContainer = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const ProfileWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const ProfileImageWrapper = styled.View`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  overflow: hidden;
  background-color: #cccccc;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const ProfileTextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Nickname = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Introduction = styled.Text`
  font-size: 13px;
  color: #999999;
`;
