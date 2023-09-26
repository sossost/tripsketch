import { colors } from "@constants/color";
import { Platform } from "react-native";
import styled from "styled-components/native";

const LikesUserItem = ({ likesData }: { likesData: any }) => {
  return (
    <LikeUserContainer>
      <InfoBox>
        <Imagebox>
          <Image source={{ uri: likesData.imageURL }}></Image>
        </Imagebox>
        <NickNamebox>{likesData.nickName}</NickNamebox>
      </InfoBox>
      <ButtonBox>
        <UserPageButton>
          <ButtonText>유저페이지</ButtonText>
        </UserPageButton>
      </ButtonBox>
    </LikeUserContainer>
  );
};

export default LikesUserItem;

const LikeUserContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;
`;

const InfoBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75%;
`;

const Imagebox = styled.View`
  width: 38px;
  height: 38px;
  background-color: #777;
  border-radius: 50px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 38px;
  height: 38px;
`;

const NickNamebox = styled.Text`
  width: 100%;
  margin-left: 10px;
`;

const ButtonBox = styled.View`
  width: 22%;
`;

const UserPageButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid ${colors.primary};
  ${Platform.OS === "ios" ? "padding: 7% 3%;" : "padding: 5% 3%;"};
`;

const ButtonText = styled.Text`
  font-size: 11px;
  text-align: center;
  color: ${colors.primary};
`;
