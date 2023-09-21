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
      <BackBtnIcon source={require("@assets/images/backIcon.png")} />
    </BackBtnWrapper>
  );
};

export default BackButton;

const BackBtnWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 30px;
  height: 30px;
  padding: 10px;
`;

const BackBtnIcon = styled.Image`
  width: 14px;
  height: 24px;
  object-fit: contain;
`;
