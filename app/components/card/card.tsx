import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "~app/theme"
import { isIOS } from "~app/utils/helper"
export interface CardProps {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export const Card = observer(function Card(props: CardProps) {
  const { style, children } = props
  return <View style={[styles.container, style]}>{children}</View>
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.white,
    borderRadius: 5,
    borderWidth: 0.2,
    elevation: isIOS ? 0 : 3,
    marginBottom: 2,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
})
