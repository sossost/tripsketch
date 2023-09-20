import { styled } from "styled-components/native";
import React, { Dispatch } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@constants/color";

type ProfileImageManageProps = {
  image: string;
  setImage: Dispatch<React.SetStateAction<string>>;
};

const ProfileImageManage = ({ image, setImage }: ProfileImageManageProps) => {
  const selectImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Container>
      <Image source={{ uri: image }} />
      <Button onPress={selectImageHandler}>
        <StyledText>사진 수정</StyledText>
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

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
