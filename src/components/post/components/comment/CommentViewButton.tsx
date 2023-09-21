import { colors } from "@constants/color";
import { styled } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

type CommentBtnProps = {
  text: string;
  activeOpacity: number;
  onPress: (index: number) => void;
};

const CommentViewButton = ({
  text,
  activeOpacity,
  onPress,
}: CommentBtnProps) => {
  return (
    <CommentButtonContainer
      activeOpacity={activeOpacity}
      onPress={() => onPress(1)}
    >
      <ButtonText>{text}</ButtonText>
      <MaterialIcons
        name="arrow-right"
        size={24}
        color={colors.primary}
        style={{ marginLeft: -12 }}
      />
    </CommentButtonContainer>
  );
};

export default CommentViewButton;

const CommentButtonContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.palePastel};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  padding: 15px 10px;
  color: ${colors.primary};
  text-align: center;
  font-size: 15px;
  font-weight: 500;
`;
