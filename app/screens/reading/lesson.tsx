import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { getDataLesson } from "~app/services/api/realtime-database";
import { Card, Text } from "~app/components";
import AnimatedLottieView from "lottie-react-native";

export function Lesson() {
  const testFirebase = useCallback(async () => {
    await getDataLesson();
  }, []);

  useEffect(() => {
    testFirebase();
  }, []);

  return (
    <View style={{ marginTop: 150 }}>
      <Card style={styles.card}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={require("../../assets/lotties/fruit.json")}
        />
        <Text
          style={{ marginVertical: 15, marginLeft: 15 }}
          text="Lesson 1: Fruit"
        />
      </Card>
      {/* <Card style={styles.card}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={require("../../assets/lotties/humans.json")}
        />
        <Text
          style={{ marginVertical: 15, marginLeft: 15 }}
          text="Lesson 2: Human"
        />
      </Card>
      <Card style={styles.card}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={require("../../assets/lotties/animal.json")}
        />
        <Text
          style={{ marginVertical: 15, marginLeft: 15 }}
          text="Lesson 3: Animal"
        />
      </Card> */}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
    transform: [
      {
        translateY: -10,
      },
    ],
  },
  card: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});
