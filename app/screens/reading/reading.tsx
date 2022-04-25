import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef } from "react"
import FlipCard from "~app/components/flip-card/flip-card"
import ReanimatedCarousel from "~app/components/reanimated-carousel"
import Tts from "react-native-tts"
import { Button } from "~app/components"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const data = [
  {
    word: "Apple",
  },
  {
    word: "Orange",
  },
  {
    word: "Banana",
  },
  {
    word: "Grape",
  },
  {
    word: "Grapefruit",
  },
  {
    word: "Starfruit",
  },
  {
    word: "Mango",
  },
  {
    word: "Lemon",
  },
  {
    word: "Cherry",
  },
  {
    word: "Berry",
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

  const readText = (text = "") => async () => {
    Tts.stop()
    Tts.speak(text)
  }
  const renderFront = () => {
    return (
      <View style={styles.frontStyle}>
        <Text style={{ fontSize: 25, color: "#fff" }}>{"Front"}</Text>
      </View>
    )
  }

  const renderBack = (item) => {
    return (
      <View style={styles.backStyle}>
        <Text style={{ fontSize: 25, color: "#fff" }}>{item.word}</Text>
        <Button text="Speak" onPress={readText(item.word)} />
      </View>
    )
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
          {renderBack(item)}
          {renderFront()}
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
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  frontStyle: {
    width: 300,
    height: 500,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  backStyle: {
    width: 300,
    height: 500,
    backgroundColor: "#f0f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
})
