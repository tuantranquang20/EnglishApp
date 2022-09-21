import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { goBack, navigate } from "~app/navigators"
import { RouteName } from "~app/navigators/constants"
import { color } from "~app/theme"

export function Footer({ params }) {
  const onLearn = () => {
    navigate(RouteName.ExerciseScreen, params)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={goBack}>
        <Image source={require("../../../../assets/images/back.png")} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.learn} onPress={onLearn}>
        <Text>Start learn</Text>
      </TouchableOpacity>
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
    shadowColor: color.palette.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 40,
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
  learn: {
    backgroundColor: color.palette.white,
    borderRadius: 8,
    elevation: 5,
    marginRight: 15,
    padding: 10,
  },
})
