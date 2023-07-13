import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
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
        <Stack.Screen name="TripDetail" component={TripDetail} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
        <Stack.Screen name="FollowerPage">
          {() => <SocialPage initialVariant="팔로워" />}
        </Stack.Screen>
        <Stack.Screen name="FollowingPage">
          {() => <SocialPage initialVariant="팔로잉" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
