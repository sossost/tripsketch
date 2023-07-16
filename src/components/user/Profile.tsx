import ProfileImage from "./profile/ProfileImage";
import Link from "../UI/Link";
import Button from "../UI/Button";
import React from "react";
import { styled } from "styled-components/native";

type ProfileProps = {
  variant: "myPage" | "userPage";
  isFollowing?: boolean;
  onPress: () => void;
  user: User;
};

export type RootStackParamList = {
  FollowerPage: undefined;
  FollowingPage: undefined;
};

const Profile = (props: ProfileProps) => {
  const { variant, isFollowing, onPress, user } = props;
  const buttonTitle =
    variant === "myPage" ? "프로필 편집" : isFollowing ? "팔로잉" : "팔로우";

  const followerCount = user.followerList.length;
  const followingCount = user.followingList.length;

  return (
    <Container>
      <Wrapper>
        <ProfileImage img={user.profile_img} />
        <RightWrapper>
          <SocialWrapper>
            <Link page="FollowerPage" text={`팔로워 ${followerCount}`} />
            <Link page="FollowingPage" text={`팔로잉 ${followingCount}`} />
          </SocialWrapper>
          <ProfileWrapper>
            <UserNameText>{user.user_name}</UserNameText>
            <IntroductionText>{user.introduction}</IntroductionText>
          </ProfileWrapper>
          <Button
            title={buttonTitle}
            style={{ color: "blue", fontSize: 14 }}
            onPress={onPress}
          />
        </RightWrapper>
      </Wrapper>
    </Container>
  );
};

/* 부모컴포넌트의 리렌더링은 대부분 카테고리가 변경될때 이므로
프로필 컴포넌트는 메모이제이션하여 불필요한 리렌더링을 막음 */
export default React.memo(Profile);

const Container = styled.View`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 25px;
`;

const RightWrapper = styled.View`
  display: flex;
  flex-grow: 1;
  gap: 10px;
  align-items: flex-start;
`;

const SocialWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ProfileWrapper = styled.View`
  display: flex;
  gap: 4px;
`;

const UserNameText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainFont};
`;

const IntroductionText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.mainFont};
`;
