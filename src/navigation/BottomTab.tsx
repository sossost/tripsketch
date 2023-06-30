import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home";
import MyPage from "../screens/MyPage";

const Tabs = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "MyPage") {
            iconName = "user";
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#167DD8",
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
}
