import { useNavigation } from "@react-navigation/native";
import React from "react";
import { styled } from "styled-components/native";

const BackButton = () => {
  const navigation = useNavigation();

  const backPressHandler = () => {
    navigation.goBack();
  };

  return (
    <BackBtnWrapper onPress={backPressHandler}>
      <BackBtnIcon source={require("../../../assets/images/backIcon.png")} />
    </BackBtnWrapper>
  );
};

export default BackButton;

const BackBtnWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

const BackBtnIcon = styled.Image`
  width: 12px;
  height: 20px;
`;
