import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import ProfileImage from "./profile/ProfileImage";
import Link from "../UI/Link";
import Button from "../UI/Button";

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
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ProfileImage img={user.profile_img} />
        <View style={styles.rightWrapper}>
          <View style={styles.socialWrapper}>
            <Link page="FollowerPage" text={`팔로워 ${followerCount}`} />
            <Link page="FollowingPage" text={`팔로잉 ${followingCount}`} />
          </View>
          <View style={styles.profileWrapper}>
            <Text style={styles.userName}>{user.user_name}</Text>
            <Text>{user.introduction}</Text>
          </View>
          <Button
            title={buttonTitle}
            style={{ color: "blue", fontSize: 14 }}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

/* 부모컴포넌트의 리렌더링은 대부분 카테고리가 변경될때 이므로
프로필 컴포넌트는 메모이제이션하여 불필요한 리렌더링을 막음 */
export default React.memo(Profile);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  idWrapper: {},
  id: {
    fontSize: 18,
    color: "#666",
  },

  wrapper: {
    flexDirection: "row",
    width: "100%",
    gap: 25,
  },

  rightWrapper: {
    flexDirection: "column",
    flexGrow: 1,
    gap: 10,
    alignItems: "flex-start",
  },

  profileWrapper: {
    flexDirection: "column",
    gap: 4,
  },

  socialWrapper: {
    flexDirection: "row",
    gap: 8,
  },

  socialText: {
    fontSize: 15,
    fontWeight: "500",
  },

  userName: {
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    flex: 1,
    height: 28,
    width: "100%",
    backgroundColor: "#73BBFB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
  },

  buttonTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
