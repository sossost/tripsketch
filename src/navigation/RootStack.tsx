import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
