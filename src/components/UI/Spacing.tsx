import { View } from "react-native";

interface SpacingProps {
  direction: "vertical" | "horizontal";
  size: number;
}

const Spacing = ({ direction, size }: SpacingProps) => {
  return (
    <View
      style={{
        flex: 0,
        height: direction === "vertical" ? size : undefined,
        width: direction === "horizontal" ? size : undefined,
      }}
    />
  );
};

export default Spacing;
