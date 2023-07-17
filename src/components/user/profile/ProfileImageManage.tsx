import { styled } from "styled-components/native";
import ProfileImage from "./ProfileImage";
import React from "react";
import { Text } from "react-native";

type ProfileImageManageProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileImageManage = ({ image, setImage }: ProfileImageManageProps) => {
  const changeProfileImageHandler = () => {
    // 로직
    setImage("새로운이미지");
  };

  return (
    <Container>
      <ProfileImage img={image} />
      <Button onPress={changeProfileImageHandler}>
        <Text>사진 수정</Text>
      </Button>
    </Container>
  );
};

export default ProfileImageManage;

const Container = styled.View`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
