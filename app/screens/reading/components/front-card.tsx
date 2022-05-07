import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { color } from "~app/theme"
import BottomActionCard from "./bottom-action-card"

type Props = {
  handleFlipCard: () => void
  item: {
    word: string
    image: string
    pronunciation: string
    translateWord: string
  }
}

export function FrontCard(props: Props) {
  const { item, handleFlipCard } = props

  return (
    <View style={styles.backStyle}>
      <Text style={styles.title}>{item.translateWord}</Text>
      <BottomActionCard disableSpeak item={item} handleFlipCard={handleFlipCard} />
    </View>
  )
}

const styles = StyleSheet.create({
  backStyle: {
    alignItems: "center",
    backgroundColor: color.palette.red,
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
