import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card, PressScale, Screen, Text } from "~app/components";
import AnimatedLottieView from "lottie-react-native";
import { color } from "~app/theme";
import { CoverImage } from "./components/cover-image";
import { Avatar } from "./components/avatar";
import { AppStacks, RouteName } from "~app/navigators/constants";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

const { width } = Dimensions.get("screen");

const feature = [
  {
    icon: require("../../../assets/lotties/setting.json"),
    title: "Setting",
    speed: 0.5,
  },
  {
    icon: require("../../../assets/lotties/message.json"),
    title: "About me",
    speed: 1,
  },
  {
    icon: require("../../../assets/lotties/logout.json"),
    title: "Logout",
    screen: RouteName.LoginScreen,
    speed: 1,
  },
];

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onPress = (item) => async () => {
    if (item?.screen === RouteName.LoginScreen) {
      await auth().signOut();
      navigation.dispatch(
        StackActions.replace(
          AppStacks.AuthStack as never,
          {
            screen: RouteName.LoginScreen,
          } as never
        )
      );
    }
  };

  const onToggleDrawer = () => {
    navigation.openDrawer();
  };

  const renderItem = ({ item }) => {
    return (
      <PressScale
        onPress={onPress(item)}
        style={[styles.vItem, styles.row, styles.space]}
      >
        <View style={styles.row}>
          <AnimatedLottieView
            style={styles.homeIcon}
            autoPlay
            speed={item?.speed}
            loop
            source={item.icon}
          />
          <Text style={styles.txt} preset={"bold"} text={item.title} />
        </View>
        <AnimatedLottieView
          style={[styles.homeIcon, styles.arrow]}
          autoPlay
          speed={0.5}
          loop
          source={require("../../../assets/lotties/arrow-down.json")}
        />
      </PressScale>
    );
  };
  return (
    <Screen unsafe style={styles.container} preset="fixed">
      <CoverImage />
      <TouchableOpacity
        style={[styles.box, { marginTop: insets.top }]}
        onPress={onToggleDrawer}
      >
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          speed={0.5}
          source={require("../../../assets/lotties/menu.json")}
        />
      </TouchableOpacity>
      <Card style={styles.card}>
        <Avatar />
        <FlatList
          bounces={false}
          data={feature}
          renderItem={renderItem}
          keyExtractor={(_, index) => `k-${index}`}
        />
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  arrow: {
    height: 25,
    transform: [
      {
        rotate: "45deg",
      },
    ],
    width: 25,
  },
  box: {
    alignItems: "center",
    backgroundColor: color.palette.lighterGrey,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    marginLeft: 15,
    position: "absolute",
    width: 45,
  },
  card: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    marginHorizontal: 0,
    marginTop: -50,
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
  },

  homeIcon: {
    height: 40,
    width: 40,
  },
  icon: {
    height: 35,
    width: 35,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  space: {
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 16,
    marginLeft: 15,
  },
  vItem: {
    alignSelf: "center",
    borderBottomColor: color.palette.offWhite,
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginTop: 15,
    paddingVertical: 5,
    width: width - 30,
  },
});
