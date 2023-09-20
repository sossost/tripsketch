import { styled } from "styled-components/native";
import { User } from "../../types/user";
import { colors } from "../../constants/color";

/**
 * @description : 메인화면 로그인시 환영 메시지 컴포넌트
 *
 * @param currentUser : 로그인한 유저 정보
 *
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const MainWelcome = ({ currentUser }: { currentUser: User }) => {
  const { nickname, profileImageUrl } = currentUser;

  return (
    <WelcomeContainer>
      <ProfileImageWrapper>
        <ProfileImage source={{ uri: profileImageUrl }} />
      </ProfileImageWrapper>
      <WelcomeText>
        <HilightText>{nickname}</HilightText> 님, 반갑습니다:{`)`}
      </WelcomeText>
    </WelcomeContainer>
  );
};

export default MainWelcome;

const WelcomeContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  height: 40px;
`;

const ProfileImageWrapper = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  overflow: hidden;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const WelcomeText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const HilightText = styled.Text`
  font-weight: bold;
  color: ${colors.primary};
`;
