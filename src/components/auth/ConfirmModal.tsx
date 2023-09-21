import Modal from "@components/UI/Modal";
import { colors } from "@constants/color";
import React from "react";
import { styled } from "styled-components/native";

interface LogoutModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onClickConfirm: () => void;
}

/**
 * @description : ConfirmModal 컴포넌트
 *
 * @param : isModalOpen - 모달 오픈 여부
 * @param : closeModal - 모달 닫기 함수
 * @param : message - 모달 메시지
 * @param : cancelText - 취소 버튼 텍스트
 * @param : confirmText - 확인 버튼 텍스트
 * @param : onClickConfirm - 확인 버튼 클릭 시 실행 함수
 *
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.0.0,
 * @see None,
 */
const ConfirmModal = ({
  isModalOpen,
  closeModal,
  message,
  cancelText = "취소",
  confirmText = "확인",
  onClickConfirm,
}: LogoutModalProps) => {
  return (
    <>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <ContentContainer>
            <MessageContainer>
              <MessageText>{message}</MessageText>
            </MessageContainer>
            <ButtonContainer>
              <ButtonWrapper onPress={closeModal}>
                <CancelText>{cancelText}</CancelText>
              </ButtonWrapper>
              <ButtonWrapper
                onPress={() => {
                  onClickConfirm();
                  closeModal();
                }}
              >
                <ConfirmText>{confirmText}</ConfirmText>
              </ButtonWrapper>
            </ButtonContainer>
          </ContentContainer>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const CancelText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const ConfirmText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.primary};
`;
