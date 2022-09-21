import { Image, StyleSheet, View, Animated as Ani, Dimensions } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Card, PressScale, Screen, Text } from "~app/components"
import { color } from "~app/theme"
import Animated, {
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { isIOS } from "~app/utils/helper"
import { COLLECTION } from "~app/constants/constants"
import { useRoute } from "@react-navigation/native"
import { getDataFromRealTimeDB } from "~app/services/api/realtime-database"
import Toast from "react-native-toast-message"
import { toastConfig } from "~app/utils/toast"

const { width, height } = Dimensions.get("screen")
const AnimatedText = Animated.createAnimatedComponent(Text)

export function ExerciseScreen() {
  const [answerSelected, setAnswerSelected] = useState("")
  const aref = useAnimatedRef()
  const { params } = useRoute()
  const [dataOfLesson, setDataOfLesson] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const scroll = useSharedValue(0)

  useDerivedValue(() => {
    scrollTo(aref, scroll.value * width, 0, true)
  })

  const testFirebase = useCallback(async () => {}, [])

  const handleCheckAnswer = (isTrue) => {
    if (isTrue) {
      Toast.show({
        type: "success",
        text1: "Nice!",
        text2: "Next",
      })
    } else {
      Toast.show({
        type: "error",
        text1: "Sad!",
        text2: "Keep going",
      })
    }
  }

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1)
    scroll.value = scroll.value + 1
    setAnswerSelected("")
    if (scroll.value >= dataOfLesson.length - 1) scroll.value = 0
  }

  const handleSelect = (word) => () => {
    if (word !== answerSelected) {
      setAnswerSelected(word)
      handleCheckAnswer(true)
    }
  }

  useEffect(() => {}, [])

  const renderItem = (word, index) => {
    const animatedValue = useDerivedValue(() => {
      return withTiming(answerSelected === word ? 1 : 0, {
        duration: 400,
      })
    }, [answerSelected])

    const animatedCardStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animatedValue.value,
        [0, 1],
        [color.palette.white, color.palette.orangeDarker],
      )

      return { backgroundColor }
    })
    const animatedTextStyle = useAnimatedStyle(() => {
      const colors = interpolateColor(
        animatedValue.value,
        [0, 1],
        [color.palette.black, color.palette.white],
      )

      return { color: colors }
    })
    return (
      <PressScale onPress={handleSelect(word)} key={`k-${index}`}>
        <Animated.View style={[styles.item, animatedCardStyle]}>
          <AnimatedText preset={"bold"} style={[styles.text, animatedTextStyle]} text={word} />
        </Animated.View>
      </PressScale>
    )
  }

  return (
    <Screen back unsafe preset="fixed" statusBar="dark-content" style={styles.container}>
      <Ani.ScrollView
        ref={aref}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
      >
        {[1, 2, 3, 4].map((el, index) => {
          return (
            <View key={`k-${index}`} style={{ width }}>
              <View style={styles.image}>
                <Image
                  resizeMode={"contain"}
                  style={styles.img}
                  source={{
                    uri: "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
                  }}
                />
              </View>
              <Card style={styles.card}>
                <Text style={styles.question}>What do you see in picture? {currentIndex}</Text>
                {["Apple", "Orange", "Lemon"]?.map((el, index) => renderItem(el, index))}
              </Card>
            </View>
          )
        })}
      </Ani.ScrollView>
      <Toast
        autoHide={true}
        position="bottom"
        bottomOffset={70}
        config={toastConfig}
        visibilityTime={5000}
        onHide={nextQuestion}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    marginBottom: -50,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 15,
    transform: [
      {
        translateY: -50,
      },
    ],
  },
  container: {
    backgroundColor: color.palette.white,
  },
  image: {
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
  },
  img: {
    height: 230,
    width: 230,
  },
  item: {
    backgroundColor: color.palette.white,
    borderRadius: 20,
    elevation: isIOS ? 0 : 3,
    marginBottom: 2,
    marginHorizontal: 8,
    marginTop: 10,
    paddingHorizontal: 14,
    padding: 0,
    paddingVertical: 15,
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
  },
  question: {
    textAlign: "center",
  },
  text: {
    color: color.palette.black,
    fontSize: 15,
    textAlign: "center",
  },
})
