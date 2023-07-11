import { StyleSheet, TouchableOpacity, View } from "react-native";
import ProfileImage from "../components/user/profile/ProfileImage";
import { currentUser } from "../../data/mockdata";
import InputBottomLine from "../components/UI/InputBottomLine";
import { useState } from "react";

const EditProfilePage = () => {
  const [NewProfileImage, setNewProfileImage] = useState<string>(
    currentUser.profile_img
  );
  const [NewUserName, SetNewUsername] = useState<string>(currentUser.user_name);
  const [NewIntro, setNewIntro] = useState<string>(currentUser.introduction);

  const profileSubmitHandler = () => {
    const data = {
      profile_img: NewProfileImage,
      user_name: NewUserName,
      introduction: NewIntro,
    };

    // EditProfile(data);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.profileImageWrapper}>
        <ProfileImage img={currentUser.profile_img} />
        <TouchableOpacity style={styles.profileImageChangeButton}>
          사진 수정
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <InputBottomLine
          label="닉네임"
          text={NewUserName}
          setText={SetNewUsername}
          textLength={20}
        />
        <InputBottomLine
          label="소개"
          text={NewIntro}
          setText={setNewIntro}
          textLength={60}
        />
      </View>
    </View>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  profileImageWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  profileImageChangeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inputWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 20,
  },
});
