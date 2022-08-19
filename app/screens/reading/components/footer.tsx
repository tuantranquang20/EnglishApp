import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "~app/navigators";
import { RouteName } from "~app/navigators/constants";

export function Footer() {
  const navigation = useNavigation();
  const onBack = () => {
    navigation.goBack();
  };
  const onLearn = () => {
    navigate(RouteName.ExerciseScreen);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLearn}>
        <Text>Start learn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
