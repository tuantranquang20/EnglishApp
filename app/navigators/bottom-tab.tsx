/* eslint-disable react/display-name */
import React from "react"
import { Image, StyleSheet } from "react-native"
import { ProfileScreen } from "~app/screens"
import AnimatedLottieView from "lottie-react-native"
import { HomeStack } from "./stack/home-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerContent } from "./drawer-content"

const Drawer = createDrawerNavigator()

export function BottomTab() {
  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name={"Home"}
        component={HomeStack}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Image style={styles.icon} source={require("../../assets/images/home.png")} />
          ),
        }}
      />
      <Drawer.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Image style={styles.icon} source={require("../../assets/images/profile.png")} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
})
