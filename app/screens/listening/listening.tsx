/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import DuoDragDrop, {
  DuoDragDropRef,
  Word,
  Placeholder,
  Lines,
} from "~components/doulingo";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { color } from "~app/theme";
import isEqual from "lodash/isEqual";
import { customAnimatedStyle } from "~app/utils/helper";
import Header from "~app/components/doulingo/components/header";
import Footer from "~app/components/doulingo/components/footer";
import { SelectCell } from "./components/select-cell";
import { SelectWord } from "./components/select-word";
import { SelectImage } from "./components/select-image";
import { testF } from "~app/services/api/firestore";
// import { getCollection } from "~app/services/api/firestore";

const data = {
  words: ["Juan", "apple", "____", "eat"],
  answer: ["Juan", "eat", "apple"],
  rawAnswer: "Juan eats apple",
  type: "douLingo",
  // type: "selectCell",
  // type: "selectWord",
  // type: "selectImage",
};
const dataCell = {
  rawAnswer: "Apple",
  words: ["Apple", "Orange", "Mango"],
  type: "selectCell",
};

const dataWord = {
  rawAnswer: "How old are you",
  question: "How ___ are you?",
  answer: "old",
  words: ["many", "old", "about"],
  type: "selectWord",
};

const dataImage = {
  question: "What is apple?",
  answer: [
    {
      word: "Apple",
      image:
        "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
      description: "",
      pronunciation: "ˈapəl",
      isResult: true,
    },
    {
      word: "Orange",
      image: "https://cdn.picpng.com/orange/pic-orange-25731.png",
      description: "",
      pronunciation: "ˈɒr.ɪndʒ/",
      isResult: false,
    },
    {
      word: "Mango",
      image:
        "https://cdn.picpng.com/fresh/fresh-fruits-healthy-leaf-mango-62189.png",
      description: "",
      pronunciation: "ˈmæŋ.ɡəʊ",
      isResult: false,
    },
    {
      word: "Lemon",
      image:
        "https://cdn.picpng.com/fruits-1/citron-citrus-fruits-food-lemon-88489.png",
      description: "",
      pronunciation: "ˈlem.ən",
      isResult: false,
    },
  ],
  type: "selectImage",
};

export function ListeningScreen() {
  const [gesturesDisabled, setGesturesDisabled] = useState(false);
  const [answeredWords, setAnsweredWords] = useState<string[] | null>(null);
  const duoDragDropRef = useRef<DuoDragDropRef>(null);

  const getAllData = useCallback(async () => {
    // const result = await getCollection({
    //   collection: "reading",
    //   exercise: "exercise",
    // }); 
    // console.log("result", result);
    // await testF({
    //   collection: "reading",
    // });
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.dragDropContainer}>
        <Header />
        {/* <DuoDragDrop
            ref={duoDragDropRef}
            words={data.words}
            wordHeight={40}
            lineHeight={49}
            wordGap={4}
            gesturesDisabled={gesturesDisabled}
            wordBankOffsetY={10}
            wordBankAlignment="center"
            animatedStyleWorklet={customAnimatedStyle}
            renderWord={() => <Word textStyle={styles.word} />}
            renderPlaceholder={({ style }) => (
              <Placeholder style={[style, { borderRadius: 5 }]} />
            )}
            renderLines={(props) => (
              <Lines {...props} containerStyle={styles.lines} />
            )}
          /> */}
        {/* <SelectCell
          handlePressCell={(word) => console.log("word", word)}
          data={dataCell}
        /> */}
        <SelectImage
          handlePressImage={(item) => {
            console.log("item", item.word);
          }}
          data={dataImage}
        />
        <Footer
          handlePress={() => {
            const wordRef = duoDragDropRef.current?.getAnsweredWords();
            isEqual(wordRef, data.answer);
            setAnsweredWords(duoDragDropRef.current?.getAnsweredWords() || []);
          }}
        />
        {answeredWords && (
          <View style={{ marginTop: 10 }}>
            <Text>{JSON.stringify(answeredWords)}</Text>
          </View>
        )}
        <View style={{ marginTop: 10 }}>
          <Button
            title={`Gestures disabled: ${gesturesDisabled}`}
            onPress={() => setGesturesDisabled((s) => !s)}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  dragDropContainer: {
    flex: 1,
    margin: 20,
  },
  // lines: {
  //   backgroundColor: color.transparent,
  // },
  // word: {
  //   color: color.palette.black,
  // },
});
