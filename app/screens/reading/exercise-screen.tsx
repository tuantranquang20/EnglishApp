import { Image, StyleSheet, View, Animated as Ani, Dimensions } from "react-native"
import React, { useMemo, useState } from "react"
import { Card, FImage, PressScale, Screen, Text } from "~app/components"
import { color } from "~app/theme"
import Animated, {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { isIOS } from "~app/utils/helper"
import { useNavigation, useRoute } from "@react-navigation/native"
import { RouteName } from "~app/navigators/constants"
import { updateLearningLesson } from "~app/services/api/realtime-database"
import { xor } from "lodash"

const { width } = Dimensions.get("screen")
const AnimatedText = Animated.createAnimatedComponent(Text)

export function ExerciseScreen() {
  const aref = useAnimatedRef()
  const [dataOfLesson, setDataOfLesson] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const scroll = useSharedValue(0)
  const navigation = useNavigation()
  const { params } = useRoute()
  const [result, setResult] = useState([])

  useDerivedValue(() => {
    scrollTo(aref, scroll.value * width, 0, true)
  })

  const shuffle = (array) => {
    if (!array?.length) {
      return []
    }
    let currentIndex = array?.length
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  }

  const answer = useMemo(() => params.data?.map((el) => el.word), [])

  const randomAnswer = useMemo(() => {
    return answer?.map((el, index) => {
      const answerUnique = [...answer]
      answerUnique.splice(index, 1)
      const random1 = answerUnique?.length - 1
      const answerRandom1 = answerUnique[random1]
      answerUnique.splice(random1, 1)
      const answerRandom2 = answerUnique[answerUnique?.length - 1]

      return [el, answerRandom1, answerRandom2]
    })
  }, [])

  const nextQuestion = (word) => {
    const percent = Math.round(
      (100 * (answer?.length - xor(answer, [...result, word])?.length)) / (answer?.length || 1),
    )
    if (currentIndex === params?.data?.length - 1) {
      if (+params?.params?.percent < +percent) {
        updateLearningLesson({ lesson: params?.params?.key, percent: percent, type: "reading" })
      }
      return navigation.navigate(RouteName.FinishScreen, {
        result: [...result, word],
        answer,
        screen: "exercise",
        lesson: params?.params,
      })
    }

    setResult([...result, word])
    setCurrentIndex(currentIndex + 1)
    scroll.value = scroll.value + 1
    if (scroll.value >= dataOfLesson.length - 1) scroll.value = 0
  }

  const handleSelect = (word) => () => {
    nextQuestion(word)
  }
  const renderItem = (word, index) => {
    return (
      <PressScale onPress={handleSelect(word)} key={`k-${index}`}>
        <Animated.View style={styles.item}>
          <AnimatedText preset={"bold"} style={styles.text} text={word} />
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
        {params?.data?.map((el, index) => {
          return (
            <View key={`k-${index}`} style={{ width }}>
              <View style={styles.image}>
                <FImage
                  resizeMode={"contain"}
                  style={styles.img}
                  source={{
                    uri: params?.data?.[currentIndex]?.image,
                  }}
                />
              </View>
              <Card style={styles.card}>
                <Text style={styles.question}>{currentIndex + 1}. What do you see in picture?</Text>
                {shuffle(randomAnswer[currentIndex])?.map((el, index) => renderItem(el, index))}
              </Card>
            </View>
          )
        })}
      </Ani.ScrollView>
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
