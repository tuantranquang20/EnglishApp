import { StyleSheet } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { Button } from "~app/components";

export function GrammarScreen() {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };
  return (
    <>
      <Button style={{ marginTop: 50 }} text="Show toast" onPress={showToast} />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});
