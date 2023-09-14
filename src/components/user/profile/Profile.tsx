import React from "react";
import {
  ProfileContainer,
  ProfileIntroductionText,
  ProfileLayout,
  ProfileRightWrapper,
  ProfileSocialWrapper,
  ProfileTextWrapper,
  ProfileUserNameText,
} from "./Profile.style";
import {
  useGetCurrentUser,
  useGetSocialList,
  useGetUserByNickname,
} from "../../../hooks/useUserQuery";

import ProfileImage from "./ProfileImage";
import Link from "../../UI/Link";
import Button from "../../UI/Button";
import { LINK } from "../../../constants/link";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";
import { useSocialControllerInUserPage } from "../../../hooks/useFollowQuery";

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
 * @update : 2023-09-14,
 * @version 1.1.0, 유저 페이지 컴포넌트에서 로직 분리
 * @see None,
 */
const Profile = ({ nickname }: ProfileProps) => {
  const navigation = useNavigation<StackNavigation>();

  // 현재 로그인한 유저 정보를 가져옴
  const { data: currentUser } = useGetCurrentUser();

  // 닉네임을 통해 해당 유저의 정보를 가져옴
  const { data: profileUser } = useGetUserByNickname(nickname);

  // 로그인한 유저정보를 통해 팔로잉 리스트를 가져옴
  const currentUserFollowingList =
    currentUser && useGetSocialList("팔로잉", currentUser.nickname).data;

  // 현재 유저가 해당 유저를 팔로잉하고 있는지 여부
  const isFollowing =
    currentUserFollowingList?.some((user) => {
      return user.nickname === nickname;
    }) || false;

  // 마이페이지인지 유저페이지인지 구분
  const pageVariant =
    nickname === currentUser?.nickname ? "myPage" : "userPage";

  // 마이페이지면 프로필 편집 버튼, 유저페이지면 팔로우 여부에 따라 팔로잉,팔로우 버튼 렌더링
  const buttonTitle =
    pageVariant === "myPage"
      ? "프로필 편집"
      : isFollowing
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
      handleFollowBtn(isFollowing);
    }
  };

  return (
    <ProfileLayout>
      <ProfileContainer>
        <ProfileImage img={profileUser!.profileImageUrl} />
        <ProfileRightWrapper>
          <ProfileSocialWrapper>
            <Link
              page="FollowerPage"
              params={{ nickname: profileUser!.nickname, variant: "팔로워" }}
              text={`팔로워 ${profileUser!.followersCount}`}
            />
            <Link
              page="FollowingPage"
              params={{ nickname: profileUser!.nickname, variant: "팔로잉" }}
              text={`팔로잉 ${profileUser!.followingCount}`}
            />
          </ProfileSocialWrapper>
          <ProfileTextWrapper>
            <ProfileUserNameText>{profileUser!.nickname}</ProfileUserNameText>
            <ProfileIntroductionText>
              {profileUser!.introduction}
            </ProfileIntroductionText>
          </ProfileTextWrapper>
          <Button
            title={buttonTitle}
            style={{
              color: isFollowing ? "blue" : "white",
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
