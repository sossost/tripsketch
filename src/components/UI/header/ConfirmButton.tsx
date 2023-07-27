import React from "react";
import { styled } from "styled-components/native";

const ConfirmButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <ConfirmButtonWrapper onPress={onPress}>
      <ConfirmButtonIcon
        source={require("../../../assets/images/confirmIcon.png")}
      />
    </ConfirmButtonWrapper>
  );
};

export default ConfirmButton;

const ConfirmButtonWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmButtonIcon = styled.Image`
  resize-mode: contain;
  width: 20px;
  height: 20px;
`;
