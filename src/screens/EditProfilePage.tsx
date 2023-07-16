import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileImage from "../components/user/profile/ProfileImage";
import { currentUser } from "../../data/mockdata";
import InputBottomLine from "../components/UI/InputBottomLine";
import { useState } from "react";
import { styled } from "styled-components/native";
import ProfileImageManage from "../components/user/profile/ProfileImageManage";

const EditProfilePage = () => {
  const [NewProfileImage, setNewProfileImage] = useState<string>(
    currentUser.profile_img
  );
  const [NewUserName, SetNewUsername] = useState<string>(currentUser.user_name);
  const [NewIntro, setNewIntro] = useState<string>(currentUser.introduction);

  const profileSubmitHandler = () => {
    const data = {
      profile_img: NewProfileImage,
      user_name: NewUserName,
      introduction: NewIntro,
    };

    // EditProfile(data);
  };

  return (
    <Layout>
      <ProfileImageManage
        image={NewProfileImage}
        setImage={setNewProfileImage}
      />
      <InputWrapper>
        <InputBottomLine
          label="닉네임"
          text={NewUserName}
          setText={SetNewUsername}
          textLength={20}
        />
        <InputBottomLine
          label="소개"
          text={NewIntro}
          setText={setNewIntro}
          textLength={60}
        />
      </InputWrapper>
    </Layout>
  );
};

export default EditProfilePage;

const Layout = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: white;
`;

const InputWrapper = styled.View`
  width: 100%;
  display: flex;
  gap: 20px;
`;
