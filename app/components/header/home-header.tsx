import React from "react"
import { HeaderProps } from "./header.props"

import { Card } from "../card/card"
import { Text } from "../text/text"
import { StyleSheet, View } from "react-native"

export function HomeHeader(props: HeaderProps) {
  const { onLeftPress, onRightPress } = props

  return (
    <Card style={styles.container}>
      <View style={styles.avt}>
        <Text>English App</Text>
        <Text></Text>
      </View>
      <Text preset="header">Hello</Text>
      <Text preset="header">Continue to English!</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  avt: {
    flexDirection: "row",
    marginTop: 50,
  },
  container: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 250,
    marginHorizontal: 0,
  },
})
