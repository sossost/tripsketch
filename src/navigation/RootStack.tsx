import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TripDetail from "../screens/TripDetail";
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
        <Stack.Screen name="TripDetail" component={TripDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
