import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, PressScale, Screen, Text } from "~app/components";
import { color } from "~app/theme";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { isIOS } from "~app/utils/helper";

const AnimatedText = Animated.createAnimatedComponent(Text);

export function ExerciseScreen() {
  const [answerSelected, setAnswerSelected] = useState("");

  const handleSelect = (word) => () => {
    if (word !== answerSelected) {
      setAnswerSelected(word);
    }
  };

  const renderItem = (word, index) => {
    const animatedValue = useDerivedValue(() => {
      return withTiming(answerSelected === word ? 1 : 0, {
        duration: 400,
      });
    }, [answerSelected]);

    const animatedCardStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animatedValue.value,
        [0, 1],
        [color.palette.white, color.palette.orangeDarker]
      );

      return { backgroundColor };
    });
    const animatedTextStyle = useAnimatedStyle(() => {
      const colors = interpolateColor(
        animatedValue.value,
        [0, 1],
        [color.palette.black, color.palette.white]
      );

      return { color: colors };
    });
    return (
      <PressScale onPress={handleSelect(word)} key={`k-${index}`}>
        <Animated.View style={[styles.item, animatedCardStyle]}>
          <AnimatedText
            preset={"bold"}
            style={[styles.text, animatedTextStyle]}
            text={word}
          />
        </Animated.View>
      </PressScale>
    );
  };

  return (
    <Screen
      back
      unsafe
      preset="fixed"
      statusBar="dark-content"
      style={styles.container}
    >
      <View style={styles.image}>
        <Image
          resizeMode={"contain"}
          style={styles.img}
          source={{
            uri:
              "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
          }}
        />
      </View>
      <Card style={styles.card}>
        <Text style={styles.question}>What do you see in picture?</Text>
        {["Apple", "Orange", "Lemon"]?.map((el, index) =>
          renderItem(el, index)
        )}
      </Card>
    </Screen>
  );
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
    flex: 1,
  },
  image: {
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
  },
  img: {
    height: 250,
    width: 250,
  },
  item: {
    backgroundColor: color.palette.white,
    borderRadius: 20,
    elevation: isIOS ? 0 : 3,
    marginBottom: 2,
    marginHorizontal: 8,
    marginTop: 15,
    paddingHorizontal: 14,
    padding: 0,
    paddingVertical: 20,
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
  },
  question: {
    textAlign: "center",
  },
  text: {
    color: color.palette.black,
    fontSize: 17,
    textAlign: "center",
  },
});
