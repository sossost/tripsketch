import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import MyPage from "../screens/MyPage";
import EditProfilePage from "../screens/EditProfilePage";

const MyPageStack = createStackNavigator();
interface MyPageStackScreenProps {
  screenOptions: StackNavigationOptions;
}

const MyPageStackScreen: React.FC<MyPageStackScreenProps> = ({
  screenOptions,
}) => {
  return (
    <MyPageStack.Navigator screenOptions={screenOptions}>
      <MyPageStack.Screen name="MyPage" component={MyPage} />
      <MyPageStack.Screen name="EditProfilePage" component={EditProfilePage} />
    </MyPageStack.Navigator>
  );
};

export default MyPageStackScreen;

const styles = StyleSheet.create({});
