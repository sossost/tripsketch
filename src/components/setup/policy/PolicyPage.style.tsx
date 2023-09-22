import { colors } from "@constants/color";
import { styled } from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 10px 0px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
  margin-bottom: 15px;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.mainFont};
  margin-bottom: 15px;
`;

export const List = styled.View`
  gap: 5px;
  margin-bottom: 15px;
`;

export const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
  margin-bottom: 5px;
`;

export const ListContentContainer = styled.View`
  display: flex;
  gap: 5px;
`;

export const ListContent = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.mainFont};
`;
