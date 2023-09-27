import { colors } from "@constants/color";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { StackNavigation } from "@types/RootStack";
import { LINK } from "@constants/link";

type LikesItemProps = {
  likesData: any;
  modalClose: () => void;
};

const LikesUserItem = ({ likesData, modalClose }: LikesItemProps) => {
  const navigation = useNavigation<StackNavigation>();
  const userPageHandler = () => {
    navigation.navigate(LINK.USER_PAGE, { nickname: likesData.nickname });
    modalClose();
  };

  return (
    <LikeUserContainer>
      <InfoBox>
        <Imagebox>
          <Image source={{ uri: likesData.profileImageUrl }}></Image>
        </Imagebox>
        <NickNamebox>{likesData.nickname}</NickNamebox>
      </InfoBox>
      <ButtonBox>
        <UserPageButton onPress={userPageHandler}>
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
  margin-bottom: 14px;
`;

const InfoBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75%;
`;

const Imagebox = styled.View`
  width: 42px;
  height: 42px;
  background-color: #777;
  border-radius: 50px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 42px;
  height: 42px;
`;

const NickNamebox = styled.Text`
  width: 100%;
  margin-left: 10px;
`;

const ButtonBox = styled.View`
  width: 23%;
`;

const UserPageButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid ${colors.primary};
  ${Platform.OS === "ios" ? "padding: 9% 3%;" : "padding: 7% 3%;"};
`;

const ButtonText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: ${colors.primary};
`;
