import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import AnimatedLottieView from "lottie-react-native"
import { Text } from "~app/components"
import { color, typography } from "~app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import xor from "lodash/xor"
const { width } = Dimensions.get("window")

export default function FinishScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { params } = useRoute()
  return (
    <View style={styles.flex1}>
      <TouchableOpacity
        style={[styles.back, { marginTop: insets.top + 10 }]}
        onPress={() => {
          if (params?.screen === "exercise") {
            navigation.dispatch(StackActions.pop(3))
          } else {
            navigation.dispatch(StackActions.pop(2))
          }
        }}
      >
        <Image source={require("../../../assets/images/back.png")} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.container}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={false}
          speed={0.5}
          source={require("../../assets/lotties/success.json")}
        />
        {params?.screen === "exercise" ? (
          <Text style={styles.finish}>{`Chúc mừng bạn đã đúng ${
            params?.answer?.length - xor(params?.answer, params?.result)?.length
          }/${params?.answer?.length} câu`}</Text>
        ) : (
          <View />
        )}
        <Text style={styles.des}>Mình cùng nhau cố gắng thêm nhé!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    backgroundColor: color.palette.white,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    justifyContent: "center",
    marginLeft: 15,
    position: "absolute",
    shadowColor: color.palette.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 40,
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  des: {
    marginTop: 20,
  },
  finish: {
    fontFamily: typography.semiBold,
    fontSize: 20,
    marginTop: 50,
  },
  flex1: {
    flex: 1,
  },
  icon: {
    aspectRatio: 1 / 1,
    width: width,
  },
  img: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
})
