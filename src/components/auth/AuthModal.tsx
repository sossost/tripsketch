import { Dimensions, Modal } from "react-native";
import { useContext } from "react";
import { AuthModalContext } from "@context/AuthModalProvider";
import { styled } from "styled-components/native";
import { colors } from "@constants/color";

import KakaoLoginButton from "./KakaoLoginButton";
import CustomButton from "@components/UI/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/**
 * @description : 인증 모달 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.0.0,
 * @see None,
 */
const AuthModal = () => {
  const { isModalOpen, closeModal } = useContext(AuthModalContext);

  return (
    <>
      <Modal
        transparent={true}
        visible={isModalOpen}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent>
            <StyledText>로그인하시겠습니까?</StyledText>

            <KakaoLoginButton />
            <CustomButton
              color="blue"
              buttonText="더 둘러보기"
              onPress={closeModal}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AuthModal;

const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
`;

const ModalContent = styled.View`
  display: flex;
  gap: 10px;
  width: ${SCREEN_WIDTH - 80}px;
  background-color: white;
  padding: 40px 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
  margin-bottom: 10px;
`;
