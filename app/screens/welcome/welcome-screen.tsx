import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import Voice from "@react-native-community/voice"
import AnimatedLottieView from "lottie-react-native"

export function WelcomeScreen() {
  const [result, setResult] = useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    Voice.isAvailable()
    Voice.onSpeechStart = onSpeechStartHandler
    Voice.onSpeechEnd = onSpeechEndHandler
    Voice.onSpeechResults = onSpeechResultsHandler

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start("en-US")
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* <SafeAreaView>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="your text"
            style={{ flex: 1 }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri:
                    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 24,
            backgroundColor: "red",
            padding: 8,
            borderRadius: 4,
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
        </TouchableOpacity> */}
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/hand.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/fox.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/learn.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/headphone.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/intro.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/intro2.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/intro3.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/loading.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/smile.json")}
        autoPlay
        loop
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/success.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/bee.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/bicycle-loading.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/bookmark-icon.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/contact.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/error.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/halloween-jumping-pumpkin.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/little-robot-icon.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/polar-bear.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/satisfied-bear.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/save-bookmark.json")}
        autoPlay
        speed={0.8}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/star-in-hand-baby-astronaut.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/success.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/user-icon.json")}
        autoPlay
        speed={0.6}
      />
      <AnimatedLottieView
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/lotties/homeicon.json")}
        autoPlay
        speed={0.6}
      />
      {/* </SafeAreaView> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "bold",
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
})
