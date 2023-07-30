import React from "react"
import { Card } from "../card/card"
import { Text } from "../text/text"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { color } from "~app/theme"
import AnimatedLottieView from "lottie-react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "~app/models"

export const HomeHeader = () => {
  const navigation = useNavigation()
  const { user } = useStores()
  const onPress = () => {
    navigation.openDrawer()
  }

  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        {!!user?.userInformation?.email ? (
          <TouchableOpacity style={styles.box} onPress={onPress}>
            <AnimatedLottieView
              style={styles.icon}
              autoPlay={true}
              loop={true}
              speed={0.5}
              source={require("../../../assets/lotties/menu.json")}
            />
          </TouchableOpacity>
        ) : null}
        <View />
        <Image
          resizeMode={"cover"}
          style={styles.img}
          source={require("../../../../assets/images/avt.jpeg")}
        />
      </View>
      <View style={styles.footer}>
        <Text preset="header" text={`Hello,`} />
        <Text preset="header">Continue to English!</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    backgroundColor: color.palette.lighterGrey,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    width: 45,
  },
  container: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 250,
    marginHorizontal: 0,
    paddingTop: 10,
  },
  footer: {
    flex: 1,
  },
  icon: {
    height: 35,
    width: 35,
  },
  img: {
    borderRadius: 100,
    height: 45,
    width: 45,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
})
