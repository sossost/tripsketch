import { styled } from "styled-components/native";
import { useState } from "react";
import { useGetCurrentUser, useUpdateRrofile } from "@hooks/useUserQuery";

import InputBottomLine from "@components/UI/InputBottomLine";
import ProfileImageManage from "@components/user/profile/ProfileImageManage";
import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";
import ConfirmButton from "@components/UI/header/ConfirmButton";
import PageLayout from "@components/common/PageLayout";

const EditProfileComponent = () => {
  // 현재 로그인한 유저 정보를 가져옴
  const { profileImageUrl, nickname, introduction } = useGetCurrentUser().data!;

  // 수정할 새로운 유저프로필 상태값 정의 및 할당
  const [newProfileImage, setNewProfileImage] = useState(profileImageUrl);
  const [newNickname, SetNewNickname] = useState(nickname);
  const [newIntroduction, setNewIntroduction] = useState(introduction);

  /** 프로필 수정 폼 제출하는 핸들러 */
  const handleProfileSubmit = useUpdateRrofile(
    newProfileImage,
    newNickname,
    newIntroduction
  );

  const onChangeNickname = (text: string) => {
    if (text.length > 12) return;
    SetNewNickname(text);
  };

  const onChangeIntroduction = (text: string) => {
    if (text.length > 30) return;
    setNewIntroduction(text);
  };

  return (
    <PageLayout>
      <Header
        left={<CommonHeaderLeft title="프로필 수정" />}
        right={<ConfirmButton onPress={handleProfileSubmit} />}
      />
      <ProfileImageManage
        image={newProfileImage}
        setImage={setNewProfileImage}
      />
      <InputWrapper>
        <InputBottomLine
          label="닉네임"
          text={newNickname}
          onChangeText={onChangeNickname}
          textLength={12}
        />
        <InputBottomLine
          label="소개"
          text={newIntroduction}
          onChangeText={onChangeIntroduction}
          textLength={30}
        />
      </InputWrapper>
    </PageLayout>
  );
};

export default EditProfileComponent;

const InputWrapper = styled.View`
  width: 100%;
  display: flex;
  gap: 20px;
`;
