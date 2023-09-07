import styled from "styled-components/native";

type ButtonProps = {
  onPress?: () => void;
};

const DeleteXbutton = ({ onPress }: ButtonProps) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>x</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  color: #686868;
  font-size: 12px;
  font-weight: 600;
`;

export default DeleteXbutton;
