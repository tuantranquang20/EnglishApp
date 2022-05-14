import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { color } from "~app/theme";
import { FImage, Text } from "~app/components";
import BottomActionCard from "./bottom-action-card";

type Props = {
  handleSpeak: (word: string) => void;
  handleFlipCard: () => void;
  item: {
    word: string;
    image: string;
    pronunciation: string;
  };
};

export function BackCard(props: Props) {
  const { item, handleFlipCard, handleSpeak } = props;
  const colorRandom = useMemo(() => {
    const colors = [
      color.palette.orange,
      color.palette.orangeDarker,
      color.palette.purple,
      color.palette.offWhite,
      color.palette.green,
      color.palette.pink,
      color.palette.blueWhite,
      color.palette.blue,
      color.palette.deepPurple,
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  return (
    <View style={[styles.backStyle, { backgroundColor: colorRandom }]}>
      {item?.image ? (
        <FImage
          resizeMode={"contain"}
          source={{ uri: item?.image }}
          style={styles.img}
        />
      ) : (
        <View />
      )}
      <Text preset="header" style={styles.title} text={item?.word} />
      <Text style={styles.pronunciation} text={item?.pronunciation} />
      <BottomActionCard
        item={item}
        handleFlipCard={handleFlipCard}
        handleSpeak={handleSpeak}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backStyle: {
    alignItems: "center",
    backgroundColor: color.palette.orange,
    borderRadius: 20,
    height: 500,
    justifyContent: "center",
    width: 300,
  },
  img: {
    height: 250,
    width: 250,
  },
  pronunciation: {
    color: color.palette.white,
  },
  title: {
    color: color.palette.white,
    fontSize: 30,
    marginTop: 15,
  },
});
