import { StyleSheet, Text } from "react-native"
import React from "react"
import { Screen } from "~app/components"
import { HomeHeader } from "~app/components/header/home-header"
import { Content } from "./components/content"

const learn = [
  {
    title: "Reading",
    icon: require("../../../assets/lotties/book.json"),
  },
  {
    title: "Listening",
    icon: require("../../../assets/lotties/headphone1.json"),
  },
  {
    title: "Speaking",
    icon: require("../../../assets/lotties/speaking.json"),
  },
  {
    title: "Grammar",
    icon: require("../../../assets/lotties/grammar.json"),
  },
]
export function HomeScreen() {
  return (
    <Screen style={styles.container} preset="scroll" statusBar="dark-content">
      <HomeHeader />
      {learn.map((el, index) => (
        <Content item={el} key={`k-${index}`} />
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
})
