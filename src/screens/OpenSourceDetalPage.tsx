import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";

import OpenSourceDetailPageComponent from "../components/policy/OpenSourceDetailPageComponent";

type OpenSourceLicenseRouteProp = RouteProp<
  RootStackParamList,
  "OpensourceLicenceDetailPage"
>;

const OpenSourceDetalPage = () => {
  const route = useRoute<OpenSourceLicenseRouteProp>();
  const { libraryName } = route.params;
  return <OpenSourceDetailPageComponent libraryName={libraryName} />;
};

export default OpenSourceDetalPage;
