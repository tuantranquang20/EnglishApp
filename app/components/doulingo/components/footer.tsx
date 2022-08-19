import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~app/components/button/button";
import { Text } from "~app/components/text/text";
import { color } from "~app/theme";

const Footer = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <Button
      onPress={props.handlePress}
      style={[{ marginBottom: insets.bottom + 30 }, styles.button]}
    >
      <Text style={styles.label}>CHECK</Text>
    </Button>
  );
};

export default Footer;

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 45,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  label: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
