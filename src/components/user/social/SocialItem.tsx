import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { LINK } from "@constants/link";
import { StackNavigation } from "../../../types/RootStack";
import { User } from "../../../types/user";
import { colors } from "@constants/color";

import SocialButton from "@components/user/social/SocialButton";

type SocialItemProps = {
  user: User;
  isFollowing: boolean | undefined;
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
  isMe?: boolean;
};

/**
 * @description : 소셜(팔로잉,팔로우) 아이템 컴포넌트
 *
 * @param userList : 팔로잉 or 팔로우 유저 리스트
 * @param followBtnHandler : 팔로우 버튼 핸들러
 *
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.1.0,
 * @see None,
 */
const SocialItem = ({
  user,
  isFollowing = false,
  followBtnHandler,
  isMe,
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
          <Introduction numberOfLines={1} ellipsizeMode="tail">
            {user.introduction}
          </Introduction>
        </ProfileTextWrapper>
      </ProfileWrapper>
      {!isMe && (
        <SocialButton
          isFollowing={isFollowing}
          onPress={() => followBtnHandler(user.nickname, isFollowing)}
        />
      )}
    </SocialItemContainer>
  );
};

export default SocialItem;

const SocialItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
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
  background-color: ${colors.lightGrey};
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
  flex: 1;
`;

const Nickname = styled.Text`
  color: ${colors.mainFont};
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const Introduction = styled.Text`
  font-size: 13px;
  color: ${colors.subFont};
  width: 100%;
`;
