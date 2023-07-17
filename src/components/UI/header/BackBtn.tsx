import { useNavigation } from "@react-navigation/native";
import React from "react";
import { styled } from "styled-components/native";

const BackBtn = () => {
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

export default BackBtn;

const BackBtnWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackBtnIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
