import { Dimensions, StyleSheet, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { getDataLesson, getLearningLesson } from "~app/services/api/realtime-database"
import { Card, PercentageCircle, PressScale, Screen, Text } from "~app/components"
import AnimatedLottieView from "lottie-react-native"
import { color, typography } from "~app/theme"
import { navigate } from "~app/navigators"
import { RouteName } from "~app/navigators/constants"
import Animated, { interpolateNode, Extrapolate, Value } from "react-native-reanimated"
import { onScrollEvent } from "~app/utils/animated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { COLLECTION } from "~app/constants/constants"
import sortBy from "lodash/sortBy"

const { width } = Dimensions.get("window")

export function Lesson() {
  const y = React.useRef(new Value<number>(0)).current
  const [lessons, setLessons] = useState([])
  const insets = useSafeAreaInsets()

  const getAllData = useCallback(async () => {
    await getDataLesson({ collection: COLLECTION.listening }, async (data) => {
      await getLearningLesson("listening", (progress) => {
        const result = data.map((item) => ({
          ...item,
          percent: progress?.[item?.key] ?? 0,
        }))
        if (result.length) {
          const order = sortBy(result, ["index"])
          setLessons(order)
        }
      })
    })
  }, [])

  useEffect(() => {
    getAllData()
  }, [])

  const opacity = interpolateNode(y, {
    inputRange: [0, width - insets.top],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  })
  const handlePress = (key, percent) => () => {
    navigate(RouteName.ListeningScreen, { key, percent })
  }

  const renderItem = ({ item }) => {
    return (
      <PressScale onPress={handlePress(item?.key, item?.percent)}>
        <Card style={styles.card}>
          <Text style={styles.title} text={item?.title} />
          <PercentageCircle
            radius={17}
            percent={item?.percent || 0}
            color={color.palette.orangeDarker}
          />
        </Card>
      </PressScale>
    )
  }

  return (
    <Screen back preset="fixed" statusBar="dark-content">
      <Animated.View style={[styles.bg, { paddingTop: insets.top }, { opacity: opacity }]}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={require("../../assets/lotties/listen-bg.json")}
        />
      </Animated.View>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 300 }} />}
        contentContainerStyle={{ paddingBottom: 15 + insets.bottom }}
        onScroll={onScrollEvent({ y })}
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(_, index) => `k-${index}`}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  icon: {
    aspectRatio: 1 / 1,
    transform: [
      {
        translateY: -10,
      },
    ],
    width: width,
  },
  title: {
    fontFamily: typography.bold,
    marginLeft: 15,
    marginVertical: 15,
  },
})
