import { StyleSheet, Dimensions, FlatList, View, TouchableOpacity, Image } from "react-native"
import React, { useEffect } from "react"
import { Card, PressScale, Screen, Text } from "~app/components"
import AnimatedLottieView from "lottie-react-native"
import { color } from "~app/theme"
import { CoverImage } from "./components/cover-image"
import { Avatar } from "./components/avatar"
import { AppStacks, RouteName } from "~app/navigators/constants"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppApi } from "~app/services/api/app-api"
import { UserHistoryType } from "~app/constants/constants"
import moment from "moment"
import { useStores } from "~app/models"

const { width } = Dimensions.get("screen")

const feature = [
  {
    icon: require("../../../assets/images/settings.png"),
    title: "Setting",
    speed: 0.5,
    screen: RouteName.SettingScreen,
  },
  {
    icon: require("../../../assets/images/info.png"),
    title: "About me",
    speed: 1,
  },
  {
    icon: require("../../../assets/images/logout.png"),
    title: "Logout",
    screen: RouteName.LoginScreen,
    speed: 1,
  },
]

export const ProfileScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { user: userStore } = useStores()

  const onPress = (item) => async () => {
    if (item?.screen === RouteName.LoginScreen) {
      const appApi = new AppApi()
      if (userStore?.userInformation?._id) {
        await appApi.createUserHistory({
          type: UserHistoryType.LOGOUT,
          userId: userStore.userInformation._id,
          value: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
      }
      const token = await AsyncStorage.getItem("TOKEN")
      if (token) {
        await AsyncStorage.removeItem("TOKEN")
      }
      navigation.dispatch(
        StackActions.replace(
          AppStacks.AuthStack as never,
          {
            screen: RouteName.LoginScreen,
          } as never,
        ),
      )
    } else if (item?.screen === RouteName.SettingScreen) {
      navigation.navigate(RouteName.SettingScreen)
    }
  }

  const onToggleDrawer = () => {
    navigation.openDrawer()
  }

  const renderItem = ({ item }) => {
    return (
      <PressScale onPress={onPress(item)} style={[styles.vItem, styles.row, styles.space]}>
        <View style={styles.row}>
          <Image style={styles.icon} source={item?.icon} />
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
    )
  }
  return (
    <Screen unsafe style={styles.container} preset="fixed">
      <CoverImage />
      <TouchableOpacity
        style={[styles.box, { marginTop: insets.top + 10 }]}
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
  )
}

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
})
