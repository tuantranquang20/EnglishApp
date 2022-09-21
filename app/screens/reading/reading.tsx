import { Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FlipCard from "~app/components/flip-card/flip-card";
import ReanimatedCarousel from "~app/components/reanimated-carousel";
import Tts from "react-native-tts";
import { BackCard } from "./components/back-card";
import { FrontCard } from "./components/front-card";
import { color } from "~app/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDataFromRealTimeDB } from "~app/services/api/realtime-database";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLLECTION } from "~app/constants/constants";
import { ICardRef } from "./interface";
import { Progress, Screen, Text } from "~app/components";
import { Footer } from "./components/footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function ReadingScreen() {
  const insets = useSafeAreaInsets();
  const [dataOfLesson, setDataOfLesson] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const { params } = useRoute();
  const navigation = useNavigation();

  const initTts = async () => {
    const voices = await Tts.voices();
    if (voices && voices.length > 0) {
      try {
        // 5, 9, 10, 6, 8: male
        await Tts.setDefaultLanguage(voices[9].language);
      } catch (err) {
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[9].id);
    }
  };
  useEffect(() => {
    Tts.addEventListener("tts-start", (event) => console.log("Start"));
    Tts.addEventListener("tts-finish", (event) => console.log("Finish"));
    Tts.addEventListener("tts-cancel", (event) => console.log("Cancel"));
    Tts.getInitStatus().then(initTts);
  }, []);

  const testFirebase = useCallback(async () => {
    // await createReading()
    const body = {
      collection: COLLECTION.reading,
      lesson: params,
    };
    await getDataFromRealTimeDB(body, (data) => setDataOfLesson(data));
  }, []);

  useEffect(() => {
    testFirebase();
  }, []);

  const readText = async (text = "") => {
    Tts.stop();
    Tts.speak(text);
  };

  const renderItem = ({ item }) => {
    const cardRef = useRef<ICardRef>();
    const handleFlipCard = () => cardRef.current.flipLeft();

    return (
      <FlipCard
        gestureEnabled={false}
        ref={(ref: ICardRef) => (cardRef.current = ref)}
        width={300}
        height={500}
      >
        <BackCard
          item={item}
          handleFlipCard={handleFlipCard}
          handleSpeak={readText}
        />
        <FrontCard item={item} handleFlipCard={handleFlipCard} />
      </FlipCard>
    );
  };
  return (
    <Screen
      unsafe
      preset="fixed"
      statusBar="dark-content"
      style={styles.container}
    >
      <ReanimatedCarousel
        loop={false}
        style={styles.ctn}
        width={300}
        height={560}
        data={dataOfLesson || []}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.9,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onProgressChange={(_, absoluteProgress: number) => {
          setCurrentItem(absoluteProgress);
        }}
        mode="vertical-stack"
        scrollAnimationDuration={300}
        renderItem={renderItem}
        windowSize={10}
      />
      <Footer params={params}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  ctn: {
    marginTop: 5,
    width: screenWidth,
  },
});
