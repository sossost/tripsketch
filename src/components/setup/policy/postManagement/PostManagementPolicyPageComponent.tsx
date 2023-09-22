import {
  Container,
  Description,
  List,
  ListContent,
  ListContentContainer,
  ListTitle,
  Title,
} from "@components/setup/policy/PolicyPage.style";
import { POST_MANAGEMENT_POLICY } from "./PostManagementPolicy";

import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";
import PageLayout from "@components/common/PageLayout";
import Spacing from "@components/UI/Spacing";

const PostManagementPolicyPageComponent = () => {
  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="게시물 운영방침" />} />
      <Container showsVerticalScrollIndicator={false}>
        <Title>{POST_MANAGEMENT_POLICY.title}</Title>
        <Description>{POST_MANAGEMENT_POLICY.description}</Description>
        {POST_MANAGEMENT_POLICY.content.map((item, index) => (
          <List key={index}>
            <ListTitle>{item.contentTitle}</ListTitle>
            <ListContentContainer>
              {item.contentList.map((list, index) => (
                <ListContent key={index}>{list}</ListContent>
              ))}
            </ListContentContainer>
          </List>
        ))}
        <Spacing direction="vertical" size={50} />
      </Container>
    </PageLayout>
  );
};

export default PostManagementPolicyPageComponent;
