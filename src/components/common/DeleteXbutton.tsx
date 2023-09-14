import styled from "styled-components/native";
import React from "react";

type ButtonProps = {
  onPress?: () => void;
  color?: string;
};

const DeleteXbutton: React.FC<ButtonProps> = ({ onPress, color }) => {
  return (
    <Button onPress={onPress} color={color}>
      <ButtonText color={color}>x</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity<{ color?: string }>`
  background-color: ${(props) =>
    props.color === "white" ? "rgba(0, 0, 0, 0.4)" : "transparent"};
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text<{ color?: string }>`
  color: ${(props) => (props.color === "white" ? "#cbcbcb" : "#686868")};
  font-size: 12px;
  font-weight: 600;
  transform: translateY(-1px);
`;

export default DeleteXbutton;
