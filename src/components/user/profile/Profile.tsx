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
import { useGetSocialList } from "../../../hooks/useUserQuery";

import ProfileImage from "./ProfileImage";
import Link from "../../UI/Link";
import Button from "../../UI/Button";

type ProfileProps = {
  variant: "myPage" | "userPage";
  onPress: () => void;
  user: User;
};

export type RootStackParamList = {
  FollowerPage: undefined;
  FollowingPage: undefined;
};

const Profile = ({ variant, onPress, user }: ProfileProps) => {
  console.log(user);
  const followerList = useGetSocialList("팔로워", user.nickname);
  const followingList = useGetSocialList("팔로잉", user.nickname);

  const isFollowing = followingList.data.find(
    (follwing) => follwing === user.nickname
  );

  const buttonTitle =
    variant === "myPage" ? "프로필 편집" : isFollowing ? "팔로잉" : "팔로우";

  const followerCount = followerList.data.length;
  const followingCount = followingList.data.length;

  return (
    <ProfileLayout>
      <ProfileContainer>
        <ProfileImage img={user.profileImageUrl} />
        <ProfileRightWrapper>
          <ProfileSocialWrapper>
            <Link page="FollowerPage" text={`팔로워 ${followerCount}`} />
            <Link page="FollowingPage" text={`팔로잉 ${followingCount}`} />
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
