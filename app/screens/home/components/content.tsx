import { StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { Button, Card, Text } from "~app/components"
import AnimatedLottieView from "lottie-react-native"
import { AnimatedSection, useCollapsible } from "~app/components/collapsible"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { navigate } from "~app/navigators"
import { RouteName } from "~app/navigators/constants"

const LottieViewAnimated = Animated.createAnimatedComponent(AnimatedLottieView)

export function Content({ item }) {
  const { animatedHeight, height, onPress, onLayout, state } = useCollapsible()
  const [toggle, setToggle] = useState(false)
  const toggleValue = useSharedValue(0)
  const handlePress = () => {
    toggleValue.value = toggle ? 0 : 180
    setToggle(!toggle)
    onPress()
  }
  const handleNavigate = () => {
    navigate(RouteName.ReadingScreen)
  }

  const spin = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${toggleValue.value}deg`, {
            duration: 300,
          }),
        },
      ],
    }
  })

  return (
    <Card style={[styles.row, styles.card]}>
      <View style={styles.overflow}>
        <TouchableOpacity style={[styles.row, styles.justifySpace]} onPress={handlePress}>
          <View style={[styles.row, styles.title]}>
            <AnimatedLottieView style={styles.icon} autoPlay loop source={item.icon} />
            <View>
              <Text preset="bold">{item.title}</Text>
              <Text>aaabbb</Text>
            </View>
          </View>
          <LottieViewAnimated
            style={[styles.iconArrow, spin]}
            autoPlay
            loop
            source={require("../../../../assets/lotties/arrow-down.json")}
          />
        </TouchableOpacity>
        <AnimatedSection animatedHeight={animatedHeight} onLayout={onLayout} state={state}>
          <View style={styles.textContainer}>
            <Button onPress={handleNavigate} text={"text"} />
          </View>
        </AnimatedSection>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    flex: 1,
    marginTop: 15,
    paddingVertical: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  iconArrow: {
    height: 20,
    width: 20,
  },
  justifySpace: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  overflow: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  textContainer: {
    padding: 15,
  },
  title: {
    alignItems: "center",
  },
})
