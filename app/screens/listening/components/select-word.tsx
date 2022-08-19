import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "~app/components";
import { SelectCell } from "./select-cell";
import Header from "~app/components/doulingo/components/header";

type Props = {
  data: any;
  handlePressWord: (word: string) => void;
  handlePressLottie: () => void;
};

export function SelectWord(props: Props) {
  const { data, handlePressWord, handlePressLottie } = props;
  return (
    <View>
      <Header handlePressLottie={handlePressLottie} />
      <Text style={styles.question} text={data.question} />
      <SelectCell
        enableHeader={false}
        data={data}
        handlePressCell={handlePressWord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    marginLeft: 15,
  },
});
