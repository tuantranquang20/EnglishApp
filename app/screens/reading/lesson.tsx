import { FlatList, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getDataLesson } from "~app/services/api/realtime-database";
import { Card, PressScale, Screen, Text } from "~app/components";
import AnimatedLottieView from "lottie-react-native";
import { typography } from "~app/theme";
import { navigate } from "~app/navigators";
import { RouteName } from "~app/navigators/constants";

export function Lesson() {
  const [lessons, setLessons] = useState([]);

  const getAllData = useCallback(async () => {
    await getDataLesson((data) => setLessons(data));
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  const handlePress = (key) => () => {
    navigate(RouteName.ReadingScreen, key);
  };

  const renderItem = ({ item }) => {
    return (
      <PressScale onPress={handlePress(item?.key)}>
        <Card style={styles.card}>
          <AnimatedLottieView
            style={styles.icon}
            autoPlay={true}
            loop={true}
            source={require("../../assets/lotties/fruit.json")}
          />
          <Text style={styles.title} text={item?.title} />
        </Card>
      </PressScale>
    );
  };

  return (
    <Screen preset="fixed" statusBar="dark-content">
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(_, index) => `k-${index}`}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 30,
  },
  icon: {
    height: 40,
    transform: [
      {
        translateY: -10,
      },
    ],
    width: 40,
  },
  title: {
    fontFamily: typography.bold,
    marginLeft: 15,
    marginVertical: 15,
  },
});
