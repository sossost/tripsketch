import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const buttonTitle =
    variant === "myPage" ? "프로필 편집" : isFollowing ? "팔로잉" : "팔로우";

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={{ uri: user.profile_img }} style={styles.image} />
        <View style={styles.rightWrapper}>
          <View style={styles.socialWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FollowerPage")}
            >
              <Text style={styles.socialText}>
                팔로워 {user.followerList.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("FollowingPage")}
            >
              <Text style={styles.socialText}>
                팔로잉 {user.followingList.length}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileWrapper}>
            <Text style={styles.userName}>{user.user_name}</Text>
            <Text>{user.introduction}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonTitle}>{buttonTitle}</Text>
          </TouchableOpacity>
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

  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#ccc",
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
