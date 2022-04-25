import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { color } from "~app/theme"
import { Button } from "~app/components"

interface Props {
  item: {
    word: string
  }
  handleSpeak: (word: string) => void
}

export function BackCard(props: Props) {
  const { item, handleSpeak } = props
  const onPress = () => {
    handleSpeak(item.word)
  }
  return (
    <View style={styles.backStyle}>
      <Text style={styles.title}>{item.word}</Text>
      <Button text="Speak" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  backStyle: {
    alignItems: "center",
    backgroundColor: "#f0f",
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
