import { styled } from "styled-components/native";
import { useState } from "react";
import { useGetCurrentUser, useUpdateRrofile } from "../../hooks/useUserQuery";
import { resetDataInSecureStore } from "../../utils/secureStore";
import { STORE_KEY } from "../../constants/store";
import { Button } from "react-native";

import InputBottomLine from "../UI/InputBottomLine";
import ProfileImageManage from "./profile/ProfileImageManage";
import Header from "../UI/header/Header";
import CommonHeaderLeft from "../UI/header/HeaderLeft";
import ConfirmButton from "../UI/header/ConfirmButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";

const EditProfileComponent = () => {
  const navigation = useNavigation<StackNavigation>();
  // 현재 로그인한 유저 정보를 가져옴
  const { profileImageUrl, nickname, introduction } = useGetCurrentUser().data!;

  // 수정할 새로운 유저프로필 상태값 정의 및 할당
  const [newProfileImage, setNewProfileImage] = useState(profileImageUrl);
  const [newNickname, SetNewNickname] = useState(nickname);
  const [newIntroduction, setNewIntroduction] = useState(introduction);

  const handleProfileSubmit = useUpdateRrofile(
    newProfileImage,
    newNickname,
    newIntroduction
  );

  const logout = async () => {
    await resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
    await resetDataInSecureStore(STORE_KEY.NOTIFICATION);
    navigation.navigate(LINK.MAIN);
  };

  return (
    <>
      <Header
        left={<CommonHeaderLeft title="프로필 수정" />}
        right={<ConfirmButton onPress={handleProfileSubmit} />}
      />
      <Layout>
        <ProfileImageManage
          image={newProfileImage}
          setImage={setNewProfileImage}
        />
        <InputWrapper>
          <InputBottomLine
            label="닉네임"
            text={newNickname}
            setText={SetNewNickname}
            textLength={12}
          />
          <InputBottomLine
            label="소개"
            text={newIntroduction}
            setText={setNewIntroduction}
            textLength={30}
          />
        </InputWrapper>
        <Button title="로그아웃" onPress={logout} />
      </Layout>
    </>
  );
};

export default EditProfileComponent;

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
