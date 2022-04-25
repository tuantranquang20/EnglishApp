import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { color } from "~app/theme"
import { Button } from "~app/components"

interface Props {
  item: {
    word: string
    translateWord: string
  }
  handleSpeak: (word: string) => void
}

export function FrontCard(props: Props) {
  const { item, handleSpeak } = props

  const onPress = () => {
    handleSpeak(item.translateWord)
  }
  return (
    <View style={styles.backStyle}>
      <Text style={styles.title}>{item.translateWord}</Text>
      <Button text="Speak" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  backStyle: {
    alignItems: "center",
    backgroundColor: "#EE0000",
    borderRadius: 20,
    height: 500,
    justifyContent: "center",
    width: 300,
  },
  title: {
    color: color.palette.white,
    fontSize: 25,
  },
})
