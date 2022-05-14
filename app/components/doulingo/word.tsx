import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { WordContext } from "./duo-drag-drop";
import { colors } from "./colors";

export interface WordProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  handlePressDouLingo: (text: string) => void;
}

export default function Word({
  containerStyle,
  textStyle,
  handlePressDouLingo,
}: WordProps) {
  const { wordHeight, text, wordGap } = useContext(WordContext);

  return (
    <TouchableOpacity
      onPress={() => handlePressDouLingo(text)}
      style={[
        { height: wordHeight, margin: wordGap, marginBottom: wordGap * 2 },
        styles.container,
        containerStyle,
      ]}
    >
      <Text
        style={[styles.text, textStyle]}
        allowFontScaling={false}
        numberOfLines={1}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 0,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});
