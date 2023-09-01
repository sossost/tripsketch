import { styled } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonGradientOverlay = () => {
  return (
    <GradientOverlay
      colors={["#f7f7f7", "#e0e0e0", "#f7f7f7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    ></GradientOverlay>
  );
};

export default SkeletonGradientOverlay;

const GradientOverlay = styled(LinearGradient)`
  flex: 1;
`;
