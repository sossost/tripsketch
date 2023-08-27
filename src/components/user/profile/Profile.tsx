import React from "react";
import { User } from "../../../types/user";
import {
  ProfileContainer,
  ProfileIntroductionText,
  ProfileLayout,
  ProfileRightWrapper,
  ProfileSocialWrapper,
  ProfileTextWrapper,
  ProfileUserNameText,
} from "./Profile.style";

import ProfileImage from "./ProfileImage";
import Link from "../../UI/Link";
import Button from "../../UI/Button";

type ProfileProps = {
  variant: "myPage" | "userPage";
  onPress: () => void;
  isFollowing?: boolean;
  user: User;
};

export type RootStackParamList = {
  FollowerPage: undefined;
  FollowingPage: undefined;
};

const Profile = ({ variant, onPress, isFollowing, user }: ProfileProps) => {
  const buttonTitle =
    variant === "myPage" ? "프로필 편집" : isFollowing ? "팔로잉" : "팔로우";

  return (
    <ProfileLayout>
      <ProfileContainer>
        <ProfileImage img={user.profileImageUrl} />
        <ProfileRightWrapper>
          <ProfileSocialWrapper>
            <Link
              page="FollowerPage"
              params={{ nickname: user.nickname, variant: "팔로워" }}
              text={`팔로워 ${user.followersCount}`}
            />
            <Link
              page="FollowingPage"
              params={{ nickname: user.nickname, variant: "팔로잉" }}
              text={`팔로잉 ${user.followingCount}`}
            />
          </ProfileSocialWrapper>
          <ProfileTextWrapper>
            <ProfileUserNameText>{user.nickname}</ProfileUserNameText>
            <ProfileIntroductionText>
              {user.introduction}
            </ProfileIntroductionText>
          </ProfileTextWrapper>
          <Button
            title={buttonTitle}
            style={{ color: "blue", fontSize: 14 }}
            onPress={onPress}
          />
        </ProfileRightWrapper>
      </ProfileContainer>
    </ProfileLayout>
  );
};

/* 부모컴포넌트의 리렌더링은 대부분 카테고리가 변경될때 이므로
프로필 컴포넌트는 메모이제이션하여 불필요한 리렌더링을 막음 */
export default React.memo(Profile);
