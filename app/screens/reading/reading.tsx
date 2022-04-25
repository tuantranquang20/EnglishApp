import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef } from "react"
import FlipCard from "~app/components/flip-card/flip-card"
import ReanimatedCarousel from "~app/components/reanimated-carousel"
import Tts from "react-native-tts"
import { Button } from "~app/components"
import { BackCard } from "./components/back-card"
import { FrontCard } from "./components/front-card"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const data = [
  {
    word: "Apple",
    translateWord: "Quả Táo",
  },
  {
    word: "Orange",
    translateWord: "Quả Cam",
  },
  {
    word: "Banana",
    translateWord: "Quả Chuối",
  },
  {
    word: "Grape",
    translateWord: "Quả Nho",
  },
  {
    word: "Grapefruit",
    translateWord: "Quả Bưởi",
  },
  {
    word: "Starfruit",
    translateWord: "Quả Khế",
  },
  {
    word: "Mango",
    translateWord: "Quả Xoài",
  },
  {
    word: "Lemon",
    translateWord: "Quả Chanh",
  },
  {
    word: "Cherry",
    translateWord: "Quả Anh Đào",
  },
  {
    word: "Berry",
    translateWord: "Quả Dâu",
  },
]

export function ReadingScreen() {
  const initTts = async () => {
    const voices = await Tts.voices()
    if (voices && voices.length > 0) {
      try {
        // 5, 9, 10, 6, 8: male
        await Tts.setDefaultLanguage(voices[9].language)
      } catch (err) {
        console.log(`setDefaultLanguage error `, err)
      }
      await Tts.setDefaultVoice(voices[9].id)
    }
  }

  useEffect(() => {
    Tts.addEventListener("tts-start", (event) => console.log("Start"))
    Tts.addEventListener("tts-finish", (event) => console.log("Finish"))
    Tts.addEventListener("tts-cancel", (event) => console.log("Cancel"))
    // Tts.addEventListener("tts-progress", (event) => console.log(event, "tts-progress"))
    Tts.getInitStatus().then(initTts)
  }, [])

  const readText = async (text = "") => {
    Tts.stop()
    Tts.speak(text)
  }

  const renderItem = ({ item }) => {
    const viewRef = useRef()
    return (
      <>
        <FlipCard
          gestureEnabled={false}
          ref={(ref) => (viewRef.current = ref)}
          width={300}
          height={500}
        >
          <BackCard item={item} handleSpeak={readText} />
          <FrontCard item={item} handleSpeak={readText} />
          <View></View>
        </FlipCard>
        <TouchableOpacity onPress={() => viewRef.current.flipLeft()}>
          <Text>aaaa</Text>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <ReanimatedCarousel
        loop={false}
        style={{
          width: screenWidth,
          height: screenHeight,
        }}
        width={300}
        data={data}
        modeConfig={{
          stackInterval: 30,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        height={500}
        mode="horizontal-stack"
        customConfig={() => ({ type: "positive" })}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
  },
  frontStyle: {
    alignItems: "center",
    backgroundColor: "#f00",
    borderRadius: 20,
    height: 500,
    justifyContent: "center",
    width: 300,
  },
})
