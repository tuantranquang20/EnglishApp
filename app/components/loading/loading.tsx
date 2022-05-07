import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Loading() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <AnimatedLottieView
        style={styles.loadingIcon}
        autoPlay={true}
        loop={true}
        source={require("../../../assets/lotties/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIcon: {
    height: 200,
    width: 200,
  },
});
