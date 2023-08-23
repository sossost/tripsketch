import { Text } from "react-native";
import { useState } from "react";
import { styled } from "styled-components/native";
import { useGetCurrentUser } from "../hooks/useUserQuery";
import { patchCurrentUser } from "../services/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types/RootStack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants";

import InputBottomLine from "../components/UI/InputBottomLine";
import ProfileImageManage from "../components/user/profile/ProfileImageManage";
import Header from "../components/UI/header/Header";
import CommonHeaderLeft from "../components/UI/header/HeaderLeft";
import ConfirmButton from "../components/UI/header/ConfirmButton";
import Toast from "react-native-toast-message";
import AuthGuard from "../components/auth/AuthGuard";

interface ModifyProfileProps {
  profileImageUrl: string;
  nickname: string;
  introduction: string;
}

const EditProfilePage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  // 로그인한 유저정보 요청
  const currentUser = useGetCurrentUser();

  // 쿼리 상태에 따라 분기처리
  if (currentUser.isLoading) return <Text>로딩중</Text>;
  if (currentUser.isError) return <Text>에러</Text>;
  if (!currentUser.data) return <Text>에러</Text>;

  // 로그인한 유저프로필 초기데이터 변수화
  const profileImageUrl = currentUser.data.profileImageUrl;
  const nickname = currentUser.data.nickname;
  const introduction = currentUser.data.introduction;

  // 수정할 새로운 유저프로필 상태값 정의 및 할당
  const [newProfileImage, setNewProfileImage] = useState(profileImageUrl);
  const [newNickname, SetNewNickname] = useState(nickname);
  const [newIntroduction, setNewIntroduction] = useState(introduction);

  /** 리액트 쿼리 뮤테이션 */
  const mutation = useMutation(
    (data: ModifyProfileProps) => patchCurrentUser(data),
    {
      onSuccess: () => {
        Toast.show({ type: "success", text1: "프로필 변경이 완료되었습니다." });
        navigation.goBack();

        // 프로필이 변경되었으므로, currentUser 쿼리를 다시 가져오도록 갱신
        queryClient.invalidateQueries([queryKeys.currentUser]);
      },
      onError: (error) => {
        Toast.show({ type: "error", text1: "프로필 변경에 실패하였습니다." });
      },
    }
  );

  /** 프로필 수정 제출 함수 */
  const handleProfileSubmit = async () => {
    const data = {
      profileImageUrl: newProfileImage,
      nickname: newNickname,
      introduction: newIntroduction,
    };

    // 리액트 쿼리의 mutation을 호출하여 데이터 업데이트
    mutation.mutate(data);
  };

  return (
    <AuthGuard>
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
            textLength={20}
          />
          <InputBottomLine
            label="소개"
            text={newIntroduction}
            setText={setNewIntroduction}
            textLength={60}
          />
        </InputWrapper>
      </Layout>
    </AuthGuard>
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
