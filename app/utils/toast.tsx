/* eslint-disable react-native/no-inline-styles */
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "~app/components";
import { color } from "~app/theme";
import { getFailedLottie, getSuccessLottie, isIOS } from "./helper";
export const toastConfig = {
  // eslint-disable-next-line react/display-name
  success: (props) => {
    return (
      <View style={[styles.success, styles.row, styles.shadow]}>
        <View>
          <Text style={styles.txt} preset={"bold"}>
            {props.text1}
          </Text>
          <Text style={styles.txt2}>{props.text2}</Text>
        </View>
        <AnimatedLottieView
          style={{ height: 70, width: 70 }}
          autoPlay
          speed={0.7}
          loop
          source={getSuccessLottie()}
        />
      </View>
    );
  },
  // eslint-disable-next-line react/display-name
  error: (props) => {
    return (
      <View style={[styles.fail, styles.row, styles.shadow]}>
        <View>
          <Text style={styles.txt} preset={"bold"}>
            {props.text1}
          </Text>
          <Text style={styles.txt2}>{props.text2}</Text>
        </View>
        <AnimatedLottieView
          style={{ height: 70, width: 70 }}
          autoPlay
          speed={0.7}
          loop
          source={getFailedLottie()}
        />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  fail: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.red,
    borderLeftWidth: 5,
    borderRadius: 5,
    height: 100,
    width: "90%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  shadow: {
    elevation: isIOS ? 0 : 3,
    shadowColor: color.palette.black,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  success: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.green,
    borderLeftWidth: 5,
    borderRadius: 5,
    height: 100,
    width: "90%",
  },
  txt: {
    fontSize: 20,
    overflow: "hidden",
  },
});
