import { styled } from "styled-components/native";
import { PRIVACY_POLICY } from "./PrivacyPolicy";
import { colors } from "@constants/color";
import {
  Container,
  Description,
  List,
  ListContent,
  ListContentContainer,
  ListTitle,
  Title,
} from "@components/setup/policy/PolicyPage.style";

import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";
import PageLayout from "@components/common/PageLayout";
import Spacing from "@components/UI/Spacing";

const PrivacyPolicyPageComponent = () => {
  const { title, description, content } = PRIVACY_POLICY;

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="개인정보 처리방침" />} />
      <Container showsVerticalScrollIndicator={false}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {content.map((item, index) => (
          <List key={index}>
            <ListTitle>{item.listTitle}</ListTitle>
            {item.listContent.map((list, index) => (
              <ListContentContainer key={index}>
                <ListContent key={index}>{list.content}</ListContent>
                {list.table && (
                  <Table>
                    {list.table.map((table, index) => (
                      <ColumnWrapper key={index}>
                        <TableHeader>
                          <TableHeaderText>{table.title}</TableHeaderText>
                        </TableHeader>
                        <TableContent>
                          {table.content.map((content, index) => (
                            <TableContentText key={index} numberOfLines={10}>
                              {content}
                            </TableContentText>
                          ))}
                        </TableContent>
                      </ColumnWrapper>
                    ))}
                  </Table>
                )}
              </ListContentContainer>
            ))}
          </List>
        ))}
        <Spacing direction="vertical" size={50} />
      </Container>
    </PageLayout>
  );
};

export default PrivacyPolicyPageComponent;

const Table = styled.View`
  display: flex;
  flex-direction: row;
  border: 0.5px solid ${colors.mainFont};
  margin-bottom: 5px;
`;

const ColumnWrapper = styled.View`
  display: flex;
  flex-direction: column;
  border: 0.5px solid ${colors.mainFont};
  flex: 1;
`;

const TableHeader = styled.View`
  display: flex;
  background-color: ${colors.lightGrey};
  padding: 4px;
  justify-content: center;
  border-bottom-width: 0.5px;
`;

const TableHeaderText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const TableContent = styled.View`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const TableContentText = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: ${colors.mainFont};
  max-width: 100px;
`;
