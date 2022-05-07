import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FImage, PressScale } from "~app/components";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { color } from "~app/theme";
import { isIOS } from "~app/utils/helper";

type Props = {
  data: any;
  handlePressImage: (text: string) => void;
};

export function SelectImage(props: Props) {
  const { data, handlePressImage } = props;
  const [answerSelected, setAnswerSelected] = useState("");

  const handleSelect = (item) => () => {
    setAnswerSelected(item.word);
    handlePressImage(item);
  };

  const renderItem = (item, index) => {
    const animatedValue = useDerivedValue(() => {
      return withTiming(answerSelected === item.word ? 1 : 0, {
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
    return (
      <PressScale
        key={`k-${index}`}
        style={styles.vImage}
        onPress={handleSelect(item)}
      >
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <FImage
            resizeMode={"contain"}
            source={{ uri: item?.image }}
            style={styles.img}
          />
        </Animated.View>
      </PressScale>
    );
  };

  return (
    <View style={styles.container}>
      {data?.answer.map((el, index) => renderItem(el, index))}
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
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  img: {
    alignSelf: "center",
    height: 150,
    width: 150,
  },
  vImage: {
    width: "50%",
  },
});
