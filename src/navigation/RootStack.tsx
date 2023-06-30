import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyPage from "../screens/MyPage";
import BottomTab from "./BottomTab";

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
        <Stack.Screen name="MyPage" component={MyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
