import { Dimensions, Modal as ReactNativeModal, ViewProps } from "react-native";
import { styled } from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ModalProps extends ViewProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
}

/**
 * @description : 공용 모달 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.0.0,
 * @see None,
 */
const Modal = ({ children, isModalOpen, closeModal, ...props }: ModalProps) => {
  return (
    <>
      <ReactNativeModal
        transparent={true}
        visible={isModalOpen}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent {...props}>{children}</ModalContent>
        </ModalContainer>
      </ReactNativeModal>
    </>
  );
};

export default Modal;

const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
`;

const ModalContent = styled.View`
  display: flex;
  gap: 10px;
  width: ${SCREEN_WIDTH - 100}px;
  background-color: white;
  padding: 30px 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
