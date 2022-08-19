import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Voice from "@react-native-community/voice";
import { Card, Screen, Text } from "~app/components";
import AnimatedLottieView from "lottie-react-native";
import Header from "~app/components/doulingo/components/header";
import { createSpeaking } from "~app/services/api/realtime-database";

export function SpeakingScreen() {
  const [result, setResult] = useState("");
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    Voice.isAvailable();
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setRecording(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    const text = e.value[0];
    setResult(text);
    console.log("speech result handler", e);
  };

  const startRecording = async () => {
    if (!recording) {
      setRecording(true);
      try {
        await Voice.start("en-US");
      } catch (error) {
        console.log("error raised", error);
      }
    } else {
      stopRecording();
    }
  };

  const stopRecording = async () => {
    try {
      setRecording(false);
      await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const getAllData = useCallback(async () => {
    await createSpeaking();
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Screen
      back
      preset="fixed"
      statusBar="dark-content"
    >
      <Header />
      <Card style={styles.container}>
        <Text preset="bold" text={"Hello, how are you?"} style={styles.text} />
        <TouchableOpacity onPress={startRecording}>
          <AnimatedLottieView
            autoPlay={true}
            style={styles.speakIcon}
            speed={1}
            loop={true}
            source={require("../../assets/lotties/microphone.json")}
          />
        </TouchableOpacity>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  speakIcon: {
    height: 70,
    width: 70,
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
