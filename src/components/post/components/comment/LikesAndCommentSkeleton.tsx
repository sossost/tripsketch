import React from "react";
import { styled } from "styled-components/native";
import SkeletonGradientOverlay from "../SkeletonGradientOverlay";

const LikeAndCommentSkeleton = () => {
  return (
    <Container>
      <IconContainer>
        <IconItem>
          <SkeletonGradientOverlay />
        </IconItem>
        <IconItem>
          <SkeletonGradientOverlay />
        </IconItem>
      </IconContainer>
      <LikesAndCommentContainer>
        <SkeletonGradientOverlay />
      </LikesAndCommentContainer>
    </Container>
  );
};

export default LikeAndCommentSkeleton;

const Container = styled.View`
  margin-top: 15px;
`;

const IconContainer = styled.View`
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  gap: 5;
`;

const IconItem = styled.View`
  width: 25px;
  height: 25px;
  background-color: #f7f7f7;
`;

const LikesAndCommentContainer = styled.View`
  margin-top: 15px;
  width: 100%;
  height: 40px;
  background-color: #f7f7f7;
`;
