import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, Animated } from "react-native";
import styled from "styled-components/native";

type VariantProps<T extends string> = {
  variant1: T;
  variant2: T;
  initialVariant: T;
  setVariant: React.Dispatch<React.SetStateAction<T>>;
};

const VariantSelector = <T extends string>(props: VariantProps<T>) => {
  const { variant1, variant2, initialVariant, setVariant } = props;

  // 선택한 Variant 표시바 너비 계산
  const [layoutWidth, setLayoutWidth] = useState(0);
  const halfLayoutWidth = layoutWidth / 2;

  // 선택한 Variant 표시바 위치
  const position = useRef(
    new Animated.Value(initialVariant === variant1 ? 0 : halfLayoutWidth)
  ).current;

  // 컴포넌트 컨테이너 너비 계산
  const onLayout = (event: { nativeEvent: { layout: { width: number } } }) => {
    const { width } = event.nativeEvent.layout;
    setLayoutWidth(width);
  };

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
    <Container onLayout={onLayout}>
      <VariantBtn onPress={leftVariantBtnHandler}>
        <Text>{variant1}</Text>
      </VariantBtn>
      <VariantBtn onPress={rightVariantBtnHandler}>
        <Text>{variant2}</Text>
      </VariantBtn>
      <AnimatedUnderline style={{ transform: [{ translateX: position }] }} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  margin-bottom: 10px;
`;

const VariantBtn = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 50%;
  background-color: #73bbfb;
`;

export default VariantSelector;
