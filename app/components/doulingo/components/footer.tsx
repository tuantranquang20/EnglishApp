import React from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~app/components/text/text";
import { color } from "~app/theme";

const Footer = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <RectButton
      onPress={props.handlePress}
      style={[{ marginBottom: insets.bottom + 30 }, styles.button]}
    >
      <Text style={styles.label}>CHECK</Text>
    </RectButton>
  );
};

export default Footer;

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.palette.green,
    borderRadius: 16,
    height: 45,
    justifyContent: "center",
    width: "100%",
  },
  label: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
