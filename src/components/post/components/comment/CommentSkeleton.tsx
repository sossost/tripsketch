import React from "react";
import { styled } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

const CommentSkeleton = () => {
  return (
    <Container>
      <SkeletonCommemtText>
        <GradientOverlay
          colors={["#f7f7f7", "#e0e0e0", "#f7f7f7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        ></GradientOverlay>
      </SkeletonCommemtText>
      <SkeletonContainer>
        <GradientOverlay
          colors={["#f7f7f7", "#e0e0e0", "#f7f7f7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        ></GradientOverlay>
      </SkeletonContainer>
    </Container>
  );
};

const Container = styled.View`
  padding: 12px 15px;
`;

const SkeletonCommemtText = styled.View`
  width: 90px;
  height: 30px;
  background-color: #f7f7f7;
  border-radius: 3px;
  overflow: hidden;
`;

const SkeletonContainer = styled.View`
  margin-top: 15px;
  background-color: #f7f7f7;
  width: 100%;
  height: 75px;
  border-radius: 10px;
  overflow: hidden;
`;

const GradientOverlay = styled(LinearGradient)`
  flex: 1;
`;

export default CommentSkeleton;
