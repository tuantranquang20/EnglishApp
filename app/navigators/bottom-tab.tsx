/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet } from "react-native";
import { ProfileScreen } from "~app/screens";
import AnimatedLottieView from "lottie-react-native";
import { HomeStack } from "./stack/home-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./drawer-content";

const Drawer = createDrawerNavigator();

export function BottomTab() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={"Home"}
        component={HomeStack}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <AnimatedLottieView
              style={styles.icon}
              autoPlay={true}
              loop={true}
              source={require("../../assets/lotties/home.json")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <AnimatedLottieView
              style={styles.icon}
              autoPlay={true}
              loop={true}
              source={require("../../assets/lotties/profile.json")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
  },
});
