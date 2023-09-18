import { AppRegistry } from "react-native";
import App from "./App";
// import { name as appName } from "./app.json";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

// 아래와 같이 gestureHandlerRootHOC로 감싸줍니다.
AppRegistry.registerComponent("tripsketch", () => gestureHandlerRootHOC(App));
