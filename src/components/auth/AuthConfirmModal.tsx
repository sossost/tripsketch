import { useNavigation } from "@react-navigation/native";
import CustomButton from "../common/CustomButton";
import KakaoLoginButton from "./KakaoLoginButton";
import { StackNavigation } from "../../types/RootStack";
import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

/**
 * @description : 인증이 필요한 페이지 접근시 띄워주는 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.0.0,
 * @see None,
 */
const AuthConfirm = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <ModalContainer>
      <ModalContentWrapper>
        <StyledText>로그인이 필요합니다.</StyledText>
        <KakaoLoginButton />
        <CustomButton
          onPress={() => navigation.goBack()}
          buttonText="더 둘러보기"
          style={{
            marginVertical: 10,
          }}
          color="blue"
        />
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default AuthConfirm;

const ModalContainer = styled.View`
  position: absolute;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  inset: 0;
  background-color: white;
  z-index: 9999;
`;

const ModalContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
  margin-bottom: 10px;
`;
