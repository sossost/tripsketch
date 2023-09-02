import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Home from "../screens/Home";
import MyPage from "../screens/MyPage";
import NotificationPage from "../components/notification/NotificationPageComponent";
import CreatePost from "../screens/CreatePost";
import Header from "../components/UI/header/Header";
import Title from "../components/UI/header/Title";
import ExplorePage from "../screens/ExplorePage";

const Tabs = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#167DD8",
        tabBarShowLabel: false,
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
        name="ExplorePage"
        component={ExplorePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          title: "작성하기",
          tabBarIcon: () => (
            <AntDesign name="pluscircle" color={"black"} size={35} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notice"
        component={NotificationPage}
        options={{
          title: "알림",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="MyPage"
        component={MyPage}
        options={{
          header: () => <Header left={<Title title="마이페이지" />} />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
