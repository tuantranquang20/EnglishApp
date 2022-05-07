import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "~app/components";
import { SelectCell } from "./select-cell";

type Props = {
  data: any;
  handlePressWord: (word: string) => void;
};

export function SelectWord(props: Props) {
  const { data } = props;
  return (
    <View>
      <Text style={styles.question} text={data.question} />
      <SelectCell data={data} handlePressCell={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
  },
});
