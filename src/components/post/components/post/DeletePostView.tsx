import { styled } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const DeletePostView = () => {
  return (
    <PostViewContainer>
      <AntDesign name="warning" size={24} color="black" />
      <PostViewText>삭제된 게시글입니다.</PostViewText>
    </PostViewContainer>
  );
};

export default DeletePostView;

const PostViewContainer = styled.View`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostViewText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;
