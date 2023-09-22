import { styled } from "styled-components/native";
import { Text } from "react-native";
import { colors } from "@constants/color";
import { OpenSourceLicense } from "./OpenSourceLicense";

import PageLayout from "@components/common/PageLayout";
import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";

interface OpenSourceLicenseInterface {
  libraryName: string;
  version: string;
  _license: string;
  _description: string;
  _licenseContent: string;
}

const OpenSourceDetailPageComponent = ({
  libraryName,
}: {
  libraryName: string;
}) => {
  const openSourceLicense: OpenSourceLicenseInterface = OpenSourceLicense.find(
    (item) => item.libraryName === libraryName
  );

  const { version, _license, _description, _licenseContent } =
    openSourceLicense;

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title={libraryName.substring(1)} />} />
      <ListWrapper>
        <ListTitle>{libraryName.substring(1)}</ListTitle>
        <Text>Version : {version}</Text>
        <Text>{_license}</Text>
        <Text>{_description}</Text>
        <Text>{_licenseContent}</Text>
      </ListWrapper>
    </PageLayout>
  );
};

export default OpenSourceDetailPageComponent;

const ListWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.mainFont};
`;
