import { StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { color } from "~app/theme"
import AnimatedLottieView from "lottie-react-native"

type Props = {
  handleSpeak?: (word: string) => void
  handleFlipCard: () => void
  item: {
    word: string
    image: string
    pronunciation: string
  }
  disableSpeak?: boolean
}

export default function BottomActionCard(props: Props) {
  const { item, handleFlipCard, handleSpeak, disableSpeak } = props
  const onPress = () => {
    handleSpeak(item?.word)
  }
  return (
    <View style={styles.vBottom}>
      <TouchableOpacity style={styles.btn} onPress={handleFlipCard}>
        <AnimatedLottieView
          style={styles.reverseIcon}
          autoPlay
          speed={0.5}
          source={require("../../assets/lotties/reverse.json")}
        />
      </TouchableOpacity>
      {!disableSpeak && (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <AnimatedLottieView
            style={styles.reverseIcon}
            autoPlay
            speed={0.3}
            source={require("../../assets/lotties/speaker1.json")}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: color.palette.white,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  reverseIcon: {
    height: 20,
    width: 20,
  },
  vBottom: {
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
  },
})
