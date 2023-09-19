import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { styled } from "styled-components/native";
import { StackNavigation } from "../../../types/RootStack";
import { LINK } from "../../../constants/link";

const HamburgerBtn = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <ButtonWrapper onPress={() => navigation.navigate(LINK.SETUP_PAGE)}>
      <HamburgerIcon source={require("../../../assets/images/hamburger.png")} />
    </ButtonWrapper>
  );
};

export default HamburgerBtn;

const ButtonWrapper = styled.TouchableOpacity`
  padding: 0 2px;
`;

const HamburgerIcon = styled.Image`
  width: 26px;
  height: 20px;
  object-fit: contain;
`;
