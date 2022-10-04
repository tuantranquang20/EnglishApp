import { Dimensions, Image, StyleSheet, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { FImage, Screen, Text } from "~app/components"
import { COLLECTION } from "~app/constants/constants"
import { getDataFromRealTimeDBForReading } from "~app/services/api/realtime-database"
import { useRoute } from "@react-navigation/native"
import { color, typography } from "~app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
const { width } = Dimensions.get("screen")

export function GrammarScreen() {
  const [dataOfLesson, setDataOfLesson] = useState({})
  const { params } = useRoute()
  const insets = useSafeAreaInsets()

  const getData = useCallback(async () => {
    const body = {
      collection: COLLECTION.grammar,
      lesson: params,
    }
    await getDataFromRealTimeDBForReading(body, (data) => setDataOfLesson(data))
  }, [])
  useEffect(() => {
    getData()
  }, [])
  console.log('dataOfLesson?.image',dataOfLesson?.image)
  return (
    <Screen
      back
      unsafe
      preset="scroll"
      statusBar="dark-content"
      style={[styles.container, { paddingBottom: insets.bottom + 15 }]}
    >
      <View style={[styles.content, { marginTop: insets.top + 70 }]}>
        <Text style={styles.title}>{dataOfLesson?.title}</Text>
        <View style={styles.struct}>
          <Text style={styles.f20}>Cấu trúc</Text>
          <FImage resizeMode={"contain"} source={{ uri: dataOfLesson?.image }} style={styles.image} />
        </View>
        <View style={styles.struct}>
          <Text style={styles.f20}>Cách dùng</Text>
          {dataOfLesson?.use?.map((el, index) => (
            <View style={styles.vUse} key={`k-${index}`}>
              <Text style={styles.use}>{el.grammar}</Text>
              <Text>{el.ex}</Text>
            </View>
          ))}
        </View>
        <View style={styles.struct}>
          <Text style={styles.f20}>Dấu hiệu nhận biết</Text>
          {dataOfLesson?.know?.map((el, index) => (
            <View style={styles.vUse} key={`k-${index}`}>
              <Text>{el}</Text>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
  },
  content: {
    marginHorizontal: 15,
  },
  f20: {
    fontFamily: typography.semiBold,
    fontSize: 20,
  },
  image: {
    aspectRatio: 1.5 / 1,
  },
  struct: {
    marginTop: 15,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 25,
  },
  use: {
    fontFamily: typography.medium,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  vUse: {
    marginTop: 20,
    backgroundColor: color.line,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
})
