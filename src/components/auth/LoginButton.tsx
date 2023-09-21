import { colors } from "@constants/color";
import { styled } from "styled-components/native";

const LoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <LoginButtonWrapper onPress={onClick}>
      <LoginButtonText>로그인</LoginButtonText>
    </LoginButtonWrapper>
  );
};

export default LoginButton;

const LoginButtonWrapper = styled.TouchableOpacity`
  padding-horizontal: 5px;
`;

const LoginButtonText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${colors.primary};
`;
