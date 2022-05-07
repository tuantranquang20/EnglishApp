import * as React from "react"
import { StyleProp, View, ViewStyle, Animated, StyleSheet, ActivityIndicator } from "react-native"
import FastImage, { FastImageProps, ImageStyle, Source } from "react-native-fast-image"

const BORDER_RADIUS = {
  borderRadius: 6,
}

const CONTAINER: ViewStyle = {
  ...BORDER_RADIUS,
}

const CHILDREN: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  ...BORDER_RADIUS,
}

const LOADING: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export interface FImageProps extends FastImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ImageStyle>
  placeholderStyle?: StyleProp<ViewStyle>
  showLoading?: boolean
  loadingType?: "indicator" | "shimmer"
  source: Source
  onLoadEnd?: () => void
  initLoading: boolean
}

/**
 * Describe your component here
 */
export const FImage = (props: FImageProps) => {
  const {
    style,
    resizeMode,
    children,
    showLoading,
    initLoading,
    onLoadEnd,
    source,
    ...rest
  } = props
  const styles = Object.assign({}, CONTAINER, style)
  const [loading, setLoading] = React.useState(initLoading)
  const { uri = "" } = source

  // handle No Image

  return (
    <FastImage
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
      onLoadEnd={() => {
        setLoading(false)
        if (onLoadEnd) {
          onLoadEnd()
        }
      }}
      onError={() => {
        setLoading(false)
      }}
      onProgress={() => {
        if (!loading) {
          setLoading(true)
        }
      }}
      {...rest}
      resizeMode={resizeMode}
      style={styles}
    >
      {loading && showLoading && (
        <View style={LOADING}>
          <ActivityIndicator />
        </View>
      )}

      <Animated.View style={CHILDREN}>{children}</Animated.View>
    </FastImage>
  )
}

FImage.defaultProps = {
  resizeMode: FastImage.resizeMode.cover,
  showLoading: true,
  loadingType: "indicator",
  initLoading: false,
}
