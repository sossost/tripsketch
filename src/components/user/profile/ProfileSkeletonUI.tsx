import React from "react";
import { styled } from "styled-components/native";
import {
  ProfileContainer,
  ProfileLayout,
  ProfileRightWrapper,
  ProfileSocialWrapper,
  ProfileTextWrapper,
} from "./Profile.style";
import { colors } from "../../../constants/color";

const Profile = () => {
  return (
    <SkeletonLayout>
      <SkeletonContainer>
        <SkeletonProfileImage />
        <RightSkeletonWrapper>
          <SocialSkeletonWrapper>
            <SkeletonSocialItem />
            <SkeletonSocialItem />
          </SocialSkeletonWrapper>
          <ProfileSkeletonWrapper>
            <UserNameText />
            <IntroductionText />
          </ProfileSkeletonWrapper>
          <SkeletonButton />
        </RightSkeletonWrapper>
      </SkeletonContainer>
    </SkeletonLayout>
  );
};

/* 부모컴포넌트의 리렌더링은 대부분 카테고리가 변경될때 이므로
프로필 컴포넌트는 메모이제이션하여 불필요한 리렌더링을 막음 */
export default Profile;

const SkeletonLayout = styled(ProfileLayout)``;

const SkeletonContainer = styled(ProfileContainer)``;

const SkeletonProfileImage = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  background-color: ${colors.skeleton};
`;

const RightSkeletonWrapper = styled(ProfileRightWrapper)``;

const SocialSkeletonWrapper = styled(ProfileSocialWrapper)``;

const SkeletonSocialItem = styled.View`
  display: flex;
  flex-direction: row;
  width: 70px;
  height: 20px;
  background-color: ${colors.skeleton};
  border-radius: 9999px;
`;

const ProfileSkeletonWrapper = styled(ProfileTextWrapper)``;

const UserNameText = styled.Text`
  width: 110px;
  height: 24px;
  background-color: ${colors.skeleton};
  border-radius: 9999px;
`;

const IntroductionText = styled.Text`
  width: 200px;
  height: 20px;
  background-color: ${colors.skeleton};
  border-radius: 9999px;
`;

const SkeletonButton = styled.View`
  width: 100%;
  height: 35px;
  background-color: ${colors.skeleton};
  border-radius: 9999px;
`;
