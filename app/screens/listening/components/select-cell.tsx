import { StyleSheet, Pressable, View } from "react-native";
import React, { useState } from "react";
import { PressScale, Text } from "~app/components";
import { color } from "~app/theme";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { isIOS } from "~app/utils/helper";

type Props = {
  data: any;
  handlePressCell: (word: string) => void;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

export function SelectCell(props: Props) {
  const { data, handlePressCell } = props;
  const [answerSelected, setAnswerSelected] = useState("");

  const handleSelect = (word) => () => {
    if (word !== answerSelected) {
      setAnswerSelected(word);
      handlePressCell(word);
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
        <Animated.View style={[styles.card, animatedCardStyle]}>
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
    <View style={styles.container}>
      {data?.words?.map((el, index) => renderItem(el, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  container: {
    zIndex: 1,
  },
  text: {
    color: color.palette.black,
    fontSize: 17,
    textAlign: "center",
  },
});
