import { styled } from "styled-components/native";
import { useGetCurrentUser } from "../../../../hooks/useUserQuery";

const CommentNone = () => {
  const { data: userData } = useGetCurrentUser();
  const DEFAULT_IMAGE =
    "https://ax6izwmsuv9c.objectstorage.ap-osaka-1.oci.customer-oci.com/n/ax6izwmsuv9c/b/tripsketch/o/profile.png";
  return (
    <Container>
      <ContainerInner>
        <ImageContainer>
          <Image
            source={{
              uri: userData?.profileImageUrl || DEFAULT_IMAGE,
            }}
          />
        </ImageContainer>
        <InputContainer>
          <InputText>첫 댓글을 남겨주세요.</InputText>
        </InputContainer>
      </ContainerInner>
    </Container>
  );
};

export default CommentNone;

const Container = styled.View`
  padding: 12px 15px;
`;

const ContainerInner = styled.View`
  border-radius: 10px;
  background-color: #f7f7f7;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ImageContainer = styled.View`
  width: 15%;
`;

const Image = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 40px;
  overflow: hidden;
`;

const InputContainer = styled.View`
  width: 85%;
`;

const InputText = styled.Text`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 15px;
  width: 100%;
  color: #888;
  font-size: 13px;
`;
