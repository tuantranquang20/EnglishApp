/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import DuoDragDrop, {
  DuoDragDropRef,
  Word,
  Placeholder,
  Lines,
} from "~components/doulingo";
import { color } from "~app/theme";
import { customAnimatedStyle } from "~app/utils/helper";
import Footer from "~app/components/doulingo/components/footer";
import { SelectCell } from "./components/select-cell";
import { SelectWord } from "./components/select-word";
import { SelectImage } from "./components/select-image";
import { COLLECTION } from "~app/constants/constants";
import { getDataFromRealTimeDB } from "~app/services/api/realtime-database";
import {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Screen } from "~app/components";
import Tts from "react-native-tts";
import Toast from "react-native-toast-message";
import { toastConfig } from "~app/utils/toast";
import isEqual from "lodash/isEqual";

const { width: screenWidth } = Dimensions.get("window");

export function ListeningScreen() {
  const [gesturesDisabled, setGesturesDisabled] = useState(false);
  const [answered, setAnswered] = useState<string | null>(null);
  const duoDragDropRef = useRef<DuoDragDropRef>(null);
  const [dataOfLesson, setDataOfLesson] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const aref = useAnimatedRef();
  const scroll = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(aref, scroll.value * screenWidth, 0, true);
  });

  const getAllData = useCallback(async () => {
    const body = {
      collection: COLLECTION.listening,
      lesson: "lessonOne",
    };
    await getDataFromRealTimeDB(body, (data) => setDataOfLesson(data));
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

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
    Tts.addEventListener("tts-start", (event) => {});
    Tts.addEventListener("tts-finish", (event) => {});
    Tts.addEventListener("tts-cancel", (event) => {});
    Tts.getInitStatus().then(initTts);
  }, []);

  const readText = async (text = "") => {
    Tts.stop();
    Tts.speak(text);
  };

  const handlePressWord = (word) => {
    readText(word);
    setAnswered(word);
  };
  const handlePressImage = (item) => {
    readText(item?.word);
    setAnswered(item?.word);
  };
  const handlePressCell = (word) => {
    readText(word);
    setAnswered(word);
  };
  const handlePressDouLingo = (word) => {
    setAnswered(word);
    readText(word);
  };
  const handlePressLottie = (answer) => () => {
    readText(answer);
  };
  const handleCheckAnswer = (isTrue) => {
    if (isTrue) {
      Toast.show({
        type: "success",
        text1: "Nice!",
        text2: "Next",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Sad!",
        text2: "Keep going",
      });
    }
  };
  const handleSubmitAnswer = () => {
    switch (dataOfLesson[currentIndex]?.type) {
      case "douLingo":
        const wordRef = duoDragDropRef.current?.getAnsweredWords();
        handleCheckAnswer(isEqual(wordRef, dataOfLesson[currentIndex].answer));
        break;
      case "selectCell":
        handleCheckAnswer(dataOfLesson[currentIndex]?.rawAnswer === answered);
        break;
      case "selectImage":
        handleCheckAnswer(dataOfLesson[currentIndex]?.rawAnswer === answered);
        break;
      case "selectWord":
        handleCheckAnswer(dataOfLesson[currentIndex]?.answer === answered);
        break;
      default:
        break;
    }
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    scroll.value = scroll.value + 1;
    if (scroll.value >= dataOfLesson.length - 1) scroll.value = 0;
  };

  return (
    <Screen preset="fixed" statusBar="dark-content" style={styles.container}>
      <View style={styles.dragDropContainer}>
        <Animated.ScrollView
          ref={aref}
          horizontal={true}
          pagingEnabled={true}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {dataOfLesson?.map((el, index) => {
            switch (el.type) {
              case "douLingo":
                return (
                  <DuoDragDrop
                    handlePressLottie={handlePressLottie(el?.rawAnswer)}
                    key={`k-${index}`}
                    ref={duoDragDropRef}
                    words={el?.words}
                    wordHeight={40}
                    lineHeight={49}
                    wordGap={4}
                    gesturesDisabled={gesturesDisabled}
                    wordBankOffsetY={10}
                    wordBankAlignment="center"
                    animatedStyleWorklet={customAnimatedStyle}
                    renderWord={() => (
                      <Word
                        handlePressDouLingo={handlePressDouLingo}
                        textStyle={styles.word}
                      />
                    )}
                    renderLines={(props) => (
                      <Lines {...props} containerStyle={styles.lines} />
                    )}
                  />
                );
              case "selectCell":
                return (
                  <SelectCell
                    handlePressLottie={handlePressLottie(el?.rawAnswer)}
                    enableHeader={true}
                    key={`k-${index}`}
                    handlePressCell={handlePressCell}
                    data={el}
                  />
                );
              case "selectImage":
                return (
                  <SelectImage
                    handlePressLottie={handlePressLottie(el?.question)}
                    key={`k-${index}`}
                    handlePressImage={handlePressImage}
                    data={el}
                  />
                );
              case "selectWord":
                return (
                  <SelectWord
                    handlePressLottie={handlePressLottie(el?.rawAnswer)}
                    key={`k-${index}`}
                    handlePressWord={handlePressWord}
                    data={el}
                  />
                );
              default:
                return <View key={`k-${index}`} />;
            }
          })}
        </Animated.ScrollView>
        <Footer handlePress={handleSubmitAnswer} />
        {/* {answeredWords && (
          <View style={{ marginTop: 10 }}>
            <Text>{JSON.stringify(answeredWords)}</Text>
          </View>
        )} */}
        {/* <View style={{ marginTop: 10 }}>
          <Button
            title={`Gestures disabled: ${gesturesDisabled}`}
            onPress={() => setGesturesDisabled((s) => !s)}
          />
        </View> */}
      </View>
      <Toast
        autoHide={true}
        position="bottom"
        bottomOffset={70}
        config={toastConfig}
        visibilityTime={5000}
        onHide={nextQuestion}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  dragDropContainer: {
    flex: 1,
    // margin: 20,
  },
  lines: {
    backgroundColor: color.transparent,
  },
  word: {
    color: color.palette.black,
  },
});
