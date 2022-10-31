import * as React from "react"
import { PureComponent } from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"

export class Text extends PureComponent {
  render() {
    const {
      preset = "default",
      tx,
      txOptions,
      text,
      children,
      style: styleOverride,
      ...rest
    } = this.props as TextProps
    const i18nText = tx && translate(tx, txOptions)
    const content = i18nText || text || children

    const style = presets[preset] || presets.default
    const styles = [style, styleOverride]
    return (
      <ReactNativeText {...rest} style={styles}>
        {content}
      </ReactNativeText>
    )
  }
}
