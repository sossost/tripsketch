import { styled } from "styled-components/native";
import { colors } from "../../constants/color";
import { ErrorFallbackProps } from "./ErrorBoundary";

const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <ErrorFallbackContainer>
      <ErrorMesageTitle>네트워크 오류가 발생했습니다.</ErrorMesageTitle>
      <ErrorMessage>에러는 : {props.error.toString()}</ErrorMessage>
      <RetryButton onPress={() => props.reset()}>
        <ButtonText>다시시도</ButtonText>
      </RetryButton>
    </ErrorFallbackContainer>
  );
};

export default ErrorFallback;

const ErrorFallbackContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 10px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

const ErrorMesageTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.mainFont};
  padding-bottom: 10px;
`;

const ErrorMessage = styled.Text`
  font-size: 16px;
  color: ${colors.mainFont};
  padding-bottom: 10px;
`;
