import { StyleSheet, Image } from "react-native";

const ProfileImage = ({ img }: { img: string }) => {
  return <Image source={{ uri: img }} style={styles.image} />;
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#ccc",
  },
});
