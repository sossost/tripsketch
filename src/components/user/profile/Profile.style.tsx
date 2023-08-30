import { styled } from "styled-components/native";

export const ProfileLayout = styled.View`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 25px;
`;

export const ProfileRightWrapper = styled.View`
  display: flex;
  flex-grow: 1;
  gap: 5px;
  align-items: flex-start;
`;

export const ProfileSocialWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const ProfileTextWrapper = styled.View`
  display: flex;
  gap: 2px;
  padding-bottom: 8px;
`;

export const ProfileUserNameText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainFont};
`;

export const ProfileIntroductionText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.mainFont};
`;
