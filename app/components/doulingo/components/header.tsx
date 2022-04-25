import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./cross";
import Heart from "./heart";
import Progress from "./progress";
import Character from "./character";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    paddingLeft: 16,
  },
});

const Header = () => {
  return (
    <View>
      <View style={styles.row}>
        <Cross />
        <Progress />
        <Heart />
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
      <Character />
    </View>
  );
};

export default Header;
