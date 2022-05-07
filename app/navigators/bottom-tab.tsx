/* eslint-disable react/display-name */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { ProfileScreen, SaveScreen } from "~app/screens";
import { AppStacks, RouteName } from "./constants";
import AnimatedLottieView from "lottie-react-native";
import { color } from "~app/theme";
import { HomeStack } from "./stack/home-stack";

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.container,
      }}
    >
      <Tab.Screen
        name={AppStacks.HomeStack}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedLottieView
              style={styles.homeIcon}
              loop={focused}
              autoPlay
              source={require("../../assets/lotties/homeicon.json")}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={RouteName.SaveScreen}
        component={SaveScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedLottieView
              style={styles.saveIcon}
              autoPlay
              loop={focused}
              source={require("../../assets/lotties/save-bookmark.json")}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={RouteName.ProfileScreen}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedLottieView
              style={styles.profileIcon}
              loop={focused}
              autoPlay
              source={require("../../assets/lotties/user-icon.json")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    borderTopColor: color.palette.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    height: 60,
    paddingBottom: 5,
    position: "absolute",
    shadowColor: color.palette.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  homeIcon: {
    height: 40,
    width: 40,
  },
  profileIcon: {
    height: 43,
    width: 45,
  },
  saveIcon: {
    height: 38,
    marginBottom: 5,
    width: 38,
  },
});
