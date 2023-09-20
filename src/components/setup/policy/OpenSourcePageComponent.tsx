import { FlatList, Text } from "react-native";
import { OpenSourceLicense } from "./OpenSourceLicense";
import { styled } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@constants/color";
import { LINK } from "@constants/link";
import { StackNavigation } from "@types/RootStack";

import PageLayout from "@components/common/PageLayout";
import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";

const OpenSourcePageComponent = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="오픈소스 라이선스" />} />
      <FlatList
        data={OpenSourceLicense}
        renderItem={({ item }) => (
          <ListWrapper
            onPress={() =>
              navigation.navigate(LINK.OPENSOURCE_LICENCE_DETAIL_PAGE, {
                libraryName: item.libraryName,
              })
            }
          >
            <ListContent>
              <ListTitle>{item.libraryName}</ListTitle>
              <Text>Version. {item.version}</Text>
            </ListContent>
            <NavigationButton>
              <NavigationIcon source={require("@assets/images/nextIcon.png")} />
            </NavigationButton>
          </ListWrapper>
        )}
        keyExtractor={(item) => String(item.libraryName)}
        showsVerticalScrollIndicator={false}
      />
    </PageLayout>
  );
};

export default OpenSourcePageComponent;

const ListWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const ListContent = styled.View`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NavigationButton = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationIcon = styled.Image`
  width: 10px;
  height: 18px;
`;
