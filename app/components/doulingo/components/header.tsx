import { useNavigation } from "@react-navigation/native"
import AnimatedLottieView from "lottie-react-native"
import React, { memo } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { color, typography } from "~app/theme"
import { getLottieRandom } from "~app/utils/helper"

interface Props {
  handlePressLottie: () => void
}

const Header = (props: Props) => {
  const { handlePressLottie } = props
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.row}></View>
      <View style={styles.center}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/images/back.png")} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.title}>Complete this sentence</Text>
      </View>
      <TouchableOpacity onPress={handlePressLottie} style={styles.rowImg}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={getLottieRandom()}
        />
        <AnimatedLottieView
          style={styles.mess}
          autoPlay={true}
          loop={true}
          source={require("../../../../assets/lotties/messages.json")}
        />
      </TouchableOpacity>
    </View>
  )
}

export default memo(Header, () => true)

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    backgroundColor: color.palette.white,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: color.palette.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 40,
    zIndex: 1,
  },
  center: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    height: 200,
    width: 200,
  },
  img: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
  mess: {
    height: 50,
    marginTop: 10,
    transform: [
      {
        translateX: -15,
      },
    ],
    width: 50,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  rowImg: {
    flexDirection: "row",
  },
  title: {
    fontFamily: typography.semiBold,
    fontSize: 22,
    paddingLeft: 15,
  },
})
