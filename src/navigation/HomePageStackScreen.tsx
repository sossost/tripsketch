import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import TripDetail from "../screens/TripDetail";
import Home from "../screens/Home";

const HomeStack = createStackNavigator();
interface HomePageStackScreenProps {
  screenOptions: StackNavigationOptions;
}

const HomePageStackScreen: React.FC<HomePageStackScreenProps> = ({
  screenOptions,
}) => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="TripDetail" component={TripDetail} />
      // ...더 많은 화면들
    </HomeStack.Navigator>
  );
};

export default HomePageStackScreen;

const styles = StyleSheet.create({});
