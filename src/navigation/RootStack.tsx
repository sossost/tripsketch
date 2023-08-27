import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
import KakaoLoginPage from "../components/auth/KakaoLoginPage";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import BottomTab from "./BottomTab";
import SocialPage from "../screens/SocialPage";
import SplashScreen from "../components/common/SplashScreen";
import CreatePost from "../screens/CreatePost";
import Header from "../components/UI/header/Header";
import UserPage from "../screens/UserPage";
import EditProfilePage from "../screens/EditProfilePage";

import CommonHeaderLeft from "../components/UI/header/HeaderLeft";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <>
      <NavigationContainer>
        <SplashScreen>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="홈"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="KakaoLoginButton"
              component={KakaoLoginButton}
            />
            <Stack.Screen name="KakaoLoginPage" component={KakaoLoginPage} />
            <Stack.Screen name="TripDetail" component={TripDetail} />
            <Stack.Screen
              name="UserPage"
              component={UserPage}
              options={({ route }: any) => ({
                header: () => (
                  <Header
                    left={<CommonHeaderLeft title={route.params?.nickname} />}
                  />
                ),
              })}
            />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen
              name="FollowerPage"
              component={SocialPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FollowingPage"
              component={SocialPage}
              options={{
                headerShown: false,
              }}
            />
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
      <Toast />
    </>
  );
}
