import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
import KakaoLoginPage from "../components/auth/KakaoLoginPage";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import BottomTab from "./BottomTab";
import SocialPage from "../screens/SocialPage";
import MyPage from "../screens/MyPage";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="KakaoLoginButton" component={KakaoLoginButton} />
        <Stack.Screen name="KakaoLoginPage" component={KakaoLoginPage} />
        <Stack.Screen name="TripDetail" component={TripDetail} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen
          name="FollowerPage"
          component={() => <SocialPage initialVariant="팔로워" />}
        />
        <Stack.Screen
          name="FollowingPage"
          component={() => <SocialPage initialVariant="팔로잉" />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
