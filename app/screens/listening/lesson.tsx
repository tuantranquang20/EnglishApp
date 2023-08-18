import { Dimensions, StyleSheet, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Card, PercentageCircle, PressScale, Screen, Text } from "~app/components"
import AnimatedLottieView from "lottie-react-native"
import { color, typography } from "~app/theme"
import { navigate } from "~app/navigators"
import { RouteName } from "~app/navigators/constants"
import Animated, { interpolateNode, Extrapolate, Value } from "react-native-reanimated"
import { onScrollEvent } from "~app/utils/animated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LessonType, UserHistoryType } from "~app/constants/constants"
import { AppApi } from "~app/services/api/app-api"
import { useStores } from "~app/models"
import { observer } from "mobx-react-lite"

const { width } = Dimensions.get("window")

export const Lesson = observer(() => {
  const y = React.useRef(new Value<number>(0)).current
  const [lessons, setLessons] = useState([])
  const insets = useSafeAreaInsets()
  const { finish: finishStore, user: userStore } = useStores()

  const getAllData = useCallback(async () => {
    const appApi = new AppApi()
    const lessons = await appApi.getLesson(LessonType.LISTENING)
    if (lessons?.data?.length) {
      setLessons(lessons?.data)
    }
  }, [])

  useEffect(() => {
    getAllData()
  }, [finishStore.flag])

  const opacity = interpolateNode(y, {
    inputRange: [0, width - insets.top],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  })
  const handlePress = (id, percent, value) => async () => {
    if (userStore?.userInformation?._id) {
      const appApi = new AppApi()
      await appApi.createUserHistory({
        type: UserHistoryType.LISTENING,
        userId: userStore.userInformation._id,
        value,
      })
    }
    navigate(RouteName.ListeningScreen, { id, percent, value })
  }

  const renderItem = ({ item }) => {
    return (
      <PressScale
        onPress={handlePress(item?._id, item?.percentage, `${item?.title}: ${item?.name}`)}
      >
        <Card style={styles.card}>
          <Text style={styles.title} text={`${item?.title}: ${item?.name}`} />
          <PercentageCircle
            radius={17}
            percent={item?.percentage || 0}
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
})

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
