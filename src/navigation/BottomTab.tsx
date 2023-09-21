import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LINK } from "@constants/link";
import { colors } from "@constants/color";
import { Platform } from "react-native";

import MainPage from "@screens/MainPage";
import MyPage from "@screens/MyPage";
import CreatePost from "@screens/CreatePost";
import ExplorePage from "@screens/ExplorePage";
import NotificationPage from "@screens/NotificationPage";

const Tabs = createBottomTabNavigator();
const tabBarStyleHeight = Platform.OS === "ios" ? 80 : 55;
const createPostMarginTop = Platform.OS === "ios" ? -23 : -28;

export default function BottomTab() {
  return (
    <Tabs.Navigator
      initialRouteName={LINK.HOME}
      screenOptions={{
        tabBarActiveTintColor: "#167DD8",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: tabBarStyleHeight,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={LINK.MAIN}
        component={MainPage}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={LINK.EXPLORE_PAGE}
        component={ExplorePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={LINK.CREATE_POST_PAGE}
        component={CreatePost}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name="pluscircle"
              color={colors.primary}
              size={55}
              style={{ marginTop: createPostMarginTop }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={LINK.NOTIFICATION_PAGE}
        component={NotificationPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={LINK.MY_PAGE}
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
