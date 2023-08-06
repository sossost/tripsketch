import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
import KakaoLoginPage from "../components/auth/KakaoLoginPage";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import BottomTab from "./BottomTab";
import SocialPage from "../screens/SocialPage";
import MyPage from "../screens/MyPage";
import SplashScreen from "../components/common/SplashScreen";
import CreatePost from "../screens/CreatePost";
import EditProfilePage from "../screens/EditProfilePage";
import Header from "../components/UI/header/Header";
import HeaderLeft from "../components/UI/header/HeaderLeft";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <SplashScreen>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="홈"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="KakaoLoginButton" component={KakaoLoginButton} />
          <Stack.Screen name="카카오톡 로그인" component={KakaoLoginPage} />
          <Stack.Screen name="TripDetail" component={TripDetail} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="FollowerPage">
            {() => <SocialPage initialVariant="팔로워" />}
          </Stack.Screen>
          <Stack.Screen name="FollowingPage">
            {() => <SocialPage initialVariant="팔로잉" />}
          </Stack.Screen>
          <Stack.Screen
            name="EditProfilePage"
            component={EditProfilePage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SplashScreen>
    </NavigationContainer>
  );
}
