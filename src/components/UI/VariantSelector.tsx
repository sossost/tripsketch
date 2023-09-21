import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "@constants/color";

type VariantProps<T extends string> = {
  variant1: T;
  variant2: T;
  initialVariant: T;
  variant: T;
  setVariant: React.Dispatch<React.SetStateAction<T>>;
};

const VariantSelector = <T extends string>(props: VariantProps<T>) => {
  const { variant1, variant2, initialVariant, variant, setVariant } = props;

  const windowWidth = Dimensions.get("window").width;

  const halfLayoutWidth = (windowWidth - 30) / 2;

  // 선택한 Variant 표시바 위치
  const position = useRef(
    new Animated.Value(initialVariant === variant1 ? 0 : halfLayoutWidth)
  ).current;

  const leftVariantBtnHandler = () => {
    // 슬라이드 애니메이션 적용
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVariant(variant1);
  };

  const rightVariantBtnHandler = () => {
    // 슬라이드 애니메이션 적용
    Animated.timing(position, {
      toValue: halfLayoutWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVariant(variant2);
  };

  return (
    <Container>
      <VariantBtn onPress={leftVariantBtnHandler}>
        <VariantText isSelected={variant === variant1}>{variant1}</VariantText>
      </VariantBtn>
      <VariantBtn onPress={rightVariantBtnHandler}>
        <VariantText isSelected={variant === variant2}>{variant2}</VariantText>
      </VariantBtn>
      <Underline style={{ transform: [{ translateX: position }] }} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const VariantBtn = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const VariantText = styled.Text<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  color: ${(props) =>
    props.isSelected ? props.theme.mainFont : props.theme.subFont};
  padding-bottom: 15px;
`;

const Underline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 3px;
  border-radius: 9999px;
  width: 50%;
  background-color: ${colors.primary};
`;

export default VariantSelector;
