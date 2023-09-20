import { View } from "react-native";
import BackButton from "./BackButton";
import Title from "./Title";

interface CommonHeaderLeftProps {
  title: string;
}

const CommonHeaderLeft = ({ title }: CommonHeaderLeftProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
      }}
    >
      <BackButton />
      <Title title={title} />
    </View>
  );
};

export default CommonHeaderLeft;
