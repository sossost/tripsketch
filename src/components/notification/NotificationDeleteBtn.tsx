import React from "react";
import { styled } from "styled-components/native";
import { useDeleteNotificationQuery } from "../../hooks/useNotificationQuery";

interface NotificationDeleteBtnProps {
  dragX: any;
  onClick: () => void;
}

const NotificationDeleteBtn = ({
  dragX,
  onClick,
}: NotificationDeleteBtnProps) => {
  return (
    <ButtonContainer onPress={onClick}>
      <ButtonTextWrapper>
        <ButtonText>삭제</ButtonText>
      </ButtonTextWrapper>
    </ButtonContainer>
  );
};

export default NotificationDeleteBtn;

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 2px;
`;

const ButtonTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const ButtonText = styled.Text`
  color: white;
`;
