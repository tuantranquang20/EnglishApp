import { StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { Button, Card, Text } from "~app/components"
import AnimatedLottieView from "lottie-react-native"
import { AnimatedSection, useCollapsible } from "~app/components/collapsible"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { navigate } from "~app/navigators"
import { AnimationObject } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes"
import auth from "@react-native-firebase/auth"
import { showConfirm } from "~app/components/alert/Alert"
import { StackActions, useNavigation } from "@react-navigation/native"
import { AppStacks, RouteName } from "~app/navigators/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
const LottieViewAnimated = Animated.createAnimatedComponent(AnimatedLottieView)

type Props = {
  item: {
    title: string
    icon: string | AnimationObject
    screen: string
    des: string
  }
}

export function Content(props: Props) {
  const { item } = props
  const { animatedHeight, onPress, onLayout, state } = useCollapsible()
  const [toggle, setToggle] = useState(false)
  const navigation = useNavigation()
  const toggleValue = useSharedValue(0)
  const handlePress = () => {
    toggleValue.value = toggle ? 0 : 180
    setToggle(!toggle)
    onPress()
  }
  const handleNavigate = (screen) => async () => {
    const token = await AsyncStorage.getItem("TOKEN")
    if (token) {
      navigate(screen)
    } else {
      showConfirm("You must login first", "Login now", () => {
        navigation.dispatch(
          StackActions.replace(
            AppStacks.AuthStack as never,
            {
              screen: RouteName.LoginScreen,
            } as never,
          ),
        )
      })
    }
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
            <View style={styles.ml}>
              <Text preset="bold">{item.title}</Text>
              <Text style={styles.des}>{item?.des}</Text>
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
            <Button onPress={handleNavigate(item.screen)} text={"Go to lesson!"} />
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
  ml: {
    marginLeft: 10,
    marginTop: 10,
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
  des: {
    fontSize: 13,
  },
})
