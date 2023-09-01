import React from "react";
import { styled } from "styled-components/native";
import SkeletonGradientOverlay from "./SkeletonGradientOverlay";

const PostViewSkeleton = () => {
  return (
    <Container>
      <MainThumbnail>
        <SkeletonGradientOverlay />
      </MainThumbnail>
      <DateContainer>
        <DateInner>
          <SkeletonGradientOverlay />
        </DateInner>
      </DateContainer>
      <ImageContainer>
        <SkeletonGradientOverlay />
      </ImageContainer>
      <TextContainer>
        <TextItem></TextItem>
        <TextItem></TextItem>
      </TextContainer>
    </Container>
  );
};

export default PostViewSkeleton;

const Container = styled.View``;

const MainThumbnail = styled.View`
  width: 100%;
  height: 200px;
  background-color: #f7f7f7;
`;

const DateContainer = styled.View`
  padding: 0px 20px;
  margin-top: 15px;
`;
const DateInner = styled.View`
  width: 100%;
  height: 60px;
  background-color: #f7f7f7;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 400px;
  background-color: #f7f7f7;
  margin-top: 15px;
`;

const TextContainer = styled.View`
  margin-top: 15px;
  padding: 0px 20px;
`;

const TextItem = styled.View`
  width: 100%;
  height: 23px;
  background-color: #f7f7f7;
  margin-bottom: 7px;
`;
