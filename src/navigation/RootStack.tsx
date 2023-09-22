import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { LINK } from "@constants/link";

import BottomTab from "./BottomTab";
import PostDetail from "@screens/PostDetail";
import KakaoLoginPage from "@components/auth/KakaoLoginPage";
import SplashScreen from "@components/common/SplashScreen";
import CreatePost from "@screens/CreatePost";
import UserPage from "@screens/UserPage";
import EditProfilePage from "@screens/EditProfilePage";
import SocialPage from "@screens/SocialPage";
import UpdatePost from "@screens/UpdatePost";
import SetupPage from "@screens/setup/SetupPage";
import OpenSourcePage from "@screens/setup/OpenSourcePage";
import OpenSourceDetalPage from "@screens/setup/OpenSourceDetalPage";
import PushNotificationSetupPage from "@screens/setup/PushNotificationSetupPage";
import PrivacyPolicyPage from "@screens/setup/PrivacyPolicyPage";
import PostManagementPolicyPage from "@screens/setup/PostManagementPolicyPage";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <>
      <NavigationContainer>
        <SplashScreen>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={LINK.HOME}
          >
            <Stack.Screen name={LINK.HOME} component={BottomTab} />
            <Stack.Screen
              name={LINK.KAKAO_LOGIN_PAGE}
              component={KakaoLoginPage}
            />
            <Stack.Screen name={LINK.TRIP_DETAIL_PAGE} component={PostDetail} />
            <Stack.Screen name={LINK.USER_PAGE} component={UserPage} />
            <Stack.Screen name={LINK.CREATE_POST_PAGE} component={CreatePost} />
            <Stack.Screen name={LINK.UPDATE_POST_PAGE} component={UpdatePost} />
            <Stack.Screen name={LINK.FOLLOWER_PAGE} component={SocialPage} />
            <Stack.Screen name={LINK.FOLLOWING_PAGE} component={SocialPage} />
            <Stack.Screen
              name={LINK.EDIT_PROFILE_PAGE}
              component={EditProfilePage}
            />
            <Stack.Screen name={LINK.SETUP.SETUP_PAGE} component={SetupPage} />
            <Stack.Screen
              name={LINK.SETUP.OPENSOURCE_LICENCE_PAGE}
              component={OpenSourcePage}
            />
            <Stack.Screen
              name={LINK.SETUP.OPENSOURCE_LICENCE_DETAIL_PAGE}
              component={OpenSourceDetalPage}
            />
            <Stack.Screen
              name={LINK.SETUP.PUSH_NOTIFICATION_SETUP_PAGE}
              component={PushNotificationSetupPage}
            />
            <Stack.Screen
              name={LINK.SETUP.PRIVACY_POLICY_PAGE}
              component={PrivacyPolicyPage}
            />
            <Stack.Screen
              name={LINK.SETUP.POST_MANAGEMENT_POLICY_PAGE}
              component={PostManagementPolicyPage}
            />
          </Stack.Navigator>
        </SplashScreen>
      </NavigationContainer>
      <Toast />
    </>
  );
}
