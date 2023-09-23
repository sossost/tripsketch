import React from "react";
import { useGetCurrentUser, useGetUserByNickname } from "@hooks/useUserQuery";
import { LINK } from "@constants/link";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@types/RootStack";
import { useSocialControllerInUserPage } from "@hooks/useFollowQuery";
import { styled } from "styled-components/native";
import { Platform } from "react-native";

import Link from "@components/UI/Link";
import Button from "@components/UI/Button";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type ProfileProps = {
  nickname: string;
};

export type RootStackParamList = {
  FollowerPage: undefined;
  FollowingPage: undefined;
};

/**
 * @description : 프로필 컴포넌트
 *
 * @param nickname : 프로필 주인의 닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.2.0,
 * @see None,
 */
const Profile = ({ nickname }: ProfileProps) => {
  const navigation = useNavigation<StackNavigation>();

  // 현재 로그인한 유저 정보를 가져옴
  const { data: currentUser } = useGetCurrentUser();

  // 닉네임을 통해 해당 유저의 정보를 가져옴
  const { data: profileUser } = useGetUserByNickname(nickname);

  // 마이페이지인지 유저페이지인지 구분
  const pageVariant =
    nickname === currentUser?.nickname ? "myPage" : "userPage";

  // 마이페이지면 프로필 편집 버튼, 유저페이지면 팔로우 여부에 따라 팔로잉,팔로우 버튼 렌더링
  const buttonTitle =
    pageVariant === "myPage"
      ? "프로필 편집"
      : profileUser!.isFollowing
      ? "팔로잉"
      : "팔로우";

  /** 팔로우 버튼 핸들러 */
  const handleFollowBtn = useSocialControllerInUserPage({
    currentUser,
    profileUser,
  });

  /** onPress 버튼 핸들러 */
  const handleOnPress = () => {
    // 마이페이지면 프로필 편집 페이지로 이동
    if (pageVariant === "myPage") {
      navigation.navigate(LINK.EDIT_PROFILE_PAGE);
      return;
    }

    // 유저페이지면 팔로우 버튼 핸들러 실행
    if (pageVariant === "userPage") {
      handleFollowBtn(profileUser!.isFollowing);
    }
  };

  return (
    <ProfileLayout>
      <ProfileContainer>
        <ProifleImage source={{ uri: profileUser!.profileImageUrl }} />
        <ProfileRightWrapper>
          <ProfileSocialWrapper>
            <Link
              page="FollowerPage"
              params={{ nickname: profileUser!.nickname, variant: "팔로워" }}
              text={`팔로워 ${profileUser!.followersCount}`}
              fontSize={15}
            />

            <Link
              page="FollowingPage"
              params={{ nickname: profileUser!.nickname, variant: "팔로잉" }}
              text={`팔로잉 ${profileUser!.followingCount}`}
              fontSize={15}
            />
          </ProfileSocialWrapper>
          <ProfileTextWrapper>
            <ProfileUserNameText>{profileUser!.nickname}</ProfileUserNameText>
            <ProfileIntroductionText numberOfLines={2}>
              {profileUser!.introduction}
            </ProfileIntroductionText>
          </ProfileTextWrapper>
          <Button
            title={buttonTitle}
            style={{
              color: profileUser!.isFollowing ? "blue" : "white",
              fontSize: 14,
            }}
            onPress={handleOnPress}
          />
        </ProfileRightWrapper>
      </ProfileContainer>
    </ProfileLayout>
  );
};

/* 부모컴포넌트의 리렌더링은 대부분 카테고리가 변경될때 이므로
프로필 컴포넌트는 메모이제이션하여 불필요한 리렌더링을 막음 */
export default React.memo(Profile);

const ProfileLayout = styled.View`
  width: ${SCREEN_WIDTH - 44}px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 25px;
`;

const ProifleImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background-color: #ccc;
`;

const ProfileRightWrapper = styled.View`
  display: flex;
  flex: 1;
  gap: 1px;
  align-items: flex-start;
`;

const ProfileSocialWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ProfileTextWrapper = styled.View`
  display: flex;
  gap: 1px;
  padding-bottom: 8px;
`;

const ProfileUserNameText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainFont};
  ${Platform.OS === "ios" ? "margin: 3px 0;" : ""}
`;

const ProfileIntroductionText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.mainFont};
`;
