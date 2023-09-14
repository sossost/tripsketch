import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";
import { colors } from "../../constants/color";

/**
 * @description : 메인 포스트 리스트 끝에 도달시 보이는 탐색페이지 이동 유도 버튼
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const MoreTripsButton = () => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {
    navigation.navigate(LINK.EXPLORE_PAGE);
  };

  return (
    <StyledButton onPress={onPress}>
      <ButtonIcon source={require("../../assets/logo_blue.png")} />
      <ButtonText>새로운 여행을 떠나볼까요?</ButtonText>
    </StyledButton>
  );
};

export default MoreTripsButton;

const StyledButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.pastel};
  width: 100%;
  height: 55px;
  border-radius: 10px;
`;

const ButtonIcon = styled.Image`
  width: 30px;
  height: 23px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.primary};
`;
