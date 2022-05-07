import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");

export function CoverImage() {
  return (
    <View>
      <Image
        resizeMode={"contain"}
        style={styles.imgBg}
        source={require("../../../../assets/images/macos.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    height: (width * 600) / 960,
    width: width,
  },
});
