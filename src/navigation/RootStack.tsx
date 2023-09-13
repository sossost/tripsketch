import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LINK } from "../constants/link";

import PostDetail from "../screens/PostDetail";
import KakaoLoginPage from "../components/auth/KakaoLoginPage";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import BottomTab from "./BottomTab";
import SplashScreen from "../components/common/SplashScreen";
import CreatePost from "../screens/CreatePost";
import Header from "../components/UI/header/Header";
import UserPage from "../screens/UserPage";
import EditProfilePage from "../screens/EditProfilePage";
import CommonHeaderLeft from "../components/UI/header/HeaderLeft";
import Toast from "react-native-toast-message";
import SocialPage from "../screens/SocialPage";
import AuthConfirmModal from "../components/auth/AuthConfirmModal";
import UpdatePost from "../screens/UpdatePost";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <>
      <NavigationContainer>
        <SplashScreen>
          <Stack.Navigator initialRouteName={LINK.HOME}>
            <Stack.Screen
              name="홈"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="KakaoLoginButton"
              component={KakaoLoginButton}
            />
            <Stack.Screen
              name={LINK.KAKAO_LOGIN_PAGE}
              component={KakaoLoginPage}
            />
            <Stack.Screen name={LINK.TRIP_DETAIL_PAGE} component={PostDetail} />
            <Stack.Screen
              name={LINK.USER_PAGE}
              component={UserPage}
              options={({ route }: any) => ({
                header: () => (
                  <Header
                    left={<CommonHeaderLeft title={route.params?.nickname} />}
                  />
                ),
              })}
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
              name={LINK.AUTH_CONFIRM_MODAL}
              component={AuthConfirmModal}
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
