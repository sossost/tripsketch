import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LINK } from "../constants/link";

import PostDetail from "../screens/PostDetail";
import KakaoLoginPage from "../components/auth/KakaoLoginPage";
import BottomTab from "./BottomTab";
import SplashScreen from "../components/common/SplashScreen";
import CreatePost from "../screens/CreatePost";
import UserPage from "../screens/UserPage";
import EditProfilePage from "../screens/EditProfilePage";
import Toast from "react-native-toast-message";
import SocialPage from "../screens/SocialPage";
import UpdatePost from "../screens/UpdatePost";
import SetupPage from "../screens/SetupPage";
import OpenSourcePage from "../screens/OpenSourcePage";
import OpenSourceDetalPage from "../screens/OpenSourceDetalPage";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <>
      <NavigationContainer>
        <SplashScreen>
          <Stack.Navigator initialRouteName={LINK.HOME}>
            <Stack.Screen
              name={LINK.HOME}
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={LINK.KAKAO_LOGIN_PAGE}
              component={KakaoLoginPage}
            />
            <Stack.Screen
              name={LINK.TRIP_DETAIL_PAGE}
              component={PostDetail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.USER_PAGE}
              component={UserPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={LINK.CREATE_POST_PAGE} component={CreatePost} />
            <Stack.Screen name={LINK.UPDATE_POST_PAGE} component={UpdatePost} />
            <Stack.Screen
              name={LINK.FOLLOWER_PAGE}
              component={SocialPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.FOLLOWING_PAGE}
              component={SocialPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.EDIT_PROFILE_PAGE}
              component={EditProfilePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.SETUP_PAGE}
              component={SetupPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.OPENSOURCE_LICENCE_PAGE}
              component={OpenSourcePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={LINK.OPENSOURCE_LICENCE_DETAIL_PAGE}
              component={OpenSourceDetalPage}
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
