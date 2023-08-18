import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFollowerList, getFollowingList } from "../../../services/user";
import { User } from "../../../types";

import ProfileImage from "./ProfileImage";
import Link from "../../UI/Link";
import Button from "../../UI/Button";
import {
  ProfileContainer,
  ProfileIntroductionText,
  ProfileLayout,
  ProfileRightWrapper,
  ProfileSocialWrapper,
  ProfileTextWrapper,
  ProfileUserNameText,
} from "./Profile.style";

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
  const { data: followerList = [] } = useQuery<string[]>(
    ["followerList", user.nickname],
    () => getFollowerList(user.nickname)
  );
  const { data: followingList = [] } = useQuery<string[]>(
    ["followingList", user.nickname],
    () => getFollowingList(user.nickname)
  );

  const isFollowing = followingList.find(
    (nickName: string) => nickName === user.nickname
  );

  const buttonTitle =
    variant === "myPage" ? "프로필 편집" : isFollowing ? "팔로잉" : "팔로우";

  const followerCount = followerList.length;
  const followingCount = followingList.length;

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
