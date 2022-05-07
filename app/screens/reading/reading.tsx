import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FlipCard from "~app/components/flip-card/flip-card";
import ReanimatedCarousel from "~app/components/reanimated-carousel";
import Tts from "react-native-tts";
import { BackCard } from "./components/back-card";
import { FrontCard } from "./components/front-card";
import { color } from "~app/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  createReading,
  getDataFromRealTimeDB,
} from "~app/services/api/realtime-database";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const data = [
  {
    word: "Apple",
    translateWord: "Quả Táo",
    image:
      "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
    description: "",
    pronunciation: "ˈapəl",
  },
  {
    word: "Orange",
    translateWord: "Quả Cam",
    image: "https://cdn.picpng.com/orange/pic-orange-25731.png",
    description: "",
    pronunciation: "ˈɒr.ɪndʒ/",
  },
  {
    word: "Mango",
    translateWord: "Quả Xoài",
    image:
      "https://cdn.picpng.com/fresh/fresh-fruits-healthy-leaf-mango-62189.png",
    description: "",
    pronunciation: "ˈmæŋ.ɡəʊ",
  },
  {
    word: "Lemon",
    translateWord: "Quả Chanh",
    image:
      "https://cdn.picpng.com/fruits-1/citron-citrus-fruits-food-lemon-88489.png",
    description: "",
    pronunciation: "ˈlem.ən",
  },
  {
    word: "Cherry",
    translateWord: "Quả Anh Đào",
    image: "https://cdn.picpng.com/cherry/cherry-background-25371.png",
    description: "",
    pronunciation: "ˈtʃer.i",
  },
  {
    word: "Banana",
    translateWord: "Quả Chuối",
    image: "https://cdn.picpng.com/banana/pic-banana-25326.png",
    description: "",
    pronunciation: "bəˈnɑː.nə",
  },
  {
    word: "Grape",
    translateWord: "Quả Nho",
    image: "https://cdn.picpng.com/grape/pic-grape-25493.png",
    description: "",
    pronunciation: "ɡreɪp",
  },
  {
    word: "Starfruit",
    translateWord: "Quả Khế",
    image:
      "https://cdn.picpng.com/fruit/starfruit-fruit-yellow-carambola-92925.png",
    description: "",
    pronunciation: "stɑː.fruːt",
  },
];

export function ReadingScreen() {
  const insets = useSafeAreaInsets();
  // const [loading, setLoading] = useState(true);

  const initTts = async () => {
    // const voices = await Tts.voices();
    // if (voices && voices.length > 0) {
    //   try {
    //     // 5, 9, 10, 6, 8: male
    //     await Tts.setDefaultLanguage(voices[9].language);
    //   } catch (err) {
    //     console.log(`setDefaultLanguage error `, err);
    //   }
    //   await Tts.setDefaultVoice(voices[9].id);
    // }
  };
  // const addItemFireStore = useCallback(async () => {
  //   // await createEntity({
  //   //   model: "reading",
  //   //   item: {
  //   //     word: "Apple",
  //   //     translateWord: "Quả Táo",
  //   //     image: "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
  //   //     description: "",
  //   //     pronunciation: "ˈapəl",
  //   //   },
  //   // })

  //   // const result = await setMultiData(data, "reading", "exerciseOne")
  //   // console.log("result", result)
  //   // console.log("aaa", result.docs[0].data())
  //   // console.log(
  //   //   "await fStoreCollection()",
  //   //   await getEntity({
  //   //     collection: "reading",
  //   //     model: "exercise",
  //   //   }),
  //   // )
  //   // const result = await getAllEntityByQuery({
  //   //   collection: "reading",
  //   //   exercise: "exercise",
  //   //   practice: "exerciseOne",
  //   // })
  //   // console.log(result.docs)
  //   // console.log(
  //   //   "fStoreTest",
  //   //   await fStoreTest({
  //   //     item: {
  //   //       word: "Starfruit",
  //   //       translateWord: "Quả Khế",
  //   //       image: "https://cdn.picpng.com/fruit/starfruit-fruit-yellow-carambola-92925.png",
  //   //       description: "",
  //   //       pronunciation: "stɑː.fruːt",
  //   //     },
  //   //   }),
  //   // )
  // }, [])
  // useEffect(() => {
  //   addItemFireStore()
  // }, [])
  useEffect(() => {
    Tts.addEventListener("tts-start", (event) => console.log("Start"));
    Tts.addEventListener("tts-finish", (event) => console.log("Finish"));
    Tts.addEventListener("tts-cancel", (event) => console.log("Cancel"));
    Tts.getInitStatus().then(initTts);
  }, []);

  const testFirebase = useCallback(async () => {
    // await createReading();
    await getDataFromRealTimeDB();
  }, []);

  useEffect(() => {
    testFirebase();
  }, []);

  const readText = async (text = "") => {
    Tts.stop();
    Tts.speak(text);
  };

  const renderItem = ({ item }) => {
    const cardRef = useRef();
    const handleFlipCard = () => cardRef.current.flipLeft();

    return (
      <FlipCard
        gestureEnabled={false}
        ref={(ref) => (cardRef.current = ref)}
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
    <View style={[styles.container, { paddingTop: insets.top + 50 }]}>
      {/* {!loading && <Loading />}
      {loading && ( */}
      <ReanimatedCarousel
        loop={false}
        style={{
          width: screenWidth,
          height: screenHeight,
        }}
        width={300}
        height={500}
        data={data || []}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.9,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        mode="horizontal-stack"
        scrollAnimationDuration={300}
        renderItem={renderItem}
        windowSize={10}
      />
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.palette.white,
    flex: 1,
    justifyContent: "center",
  },
});
