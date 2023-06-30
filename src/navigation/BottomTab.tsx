import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home";
import MyPage from "../screens/MyPage";
import TripList from "../screens/TripList";

const Tabs = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#167DD8",
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Trip"
        component={TripList}
        options={{
          title: "트립",
          tabBarIcon: ({ color, size }) => (
            <Feather name="airplay" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
