/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ViewStyle, Dimensions } from "react-native"
import Animated, {
  AnimatedStyleProp,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { useCheckMounted } from "../hooks/use-check-mounted"
import { IOpts, useOffsetX } from "../hooks/use-offset-x"
import type { IVisibleRanges } from "../hooks/use-visible-ranges"
import { LazyView } from "../lazy-view"
import { CTX } from "../store"
import type { ILayoutConfig } from "./stack"
const { width: screenWidth } = Dimensions.get("window")
export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>

export const BaseLayout: React.FC<{
  index: number
  handlerOffsetX: Animated.SharedValue<number>
  visibleRanges: IVisibleRanges
  animationStyle: TAnimationStyle
  children: (ctx: { animationValue: Animated.SharedValue<number> }) => React.ReactElement
}> = (props) => {
  const mounted = useCheckMounted()
  const { handlerOffsetX, index, children, visibleRanges, animationStyle } = props

  const context = React.useContext(CTX)
  const {
    props: { loop, data, width, height, vertical, customConfig, mode, modeConfig },
  } = context
  const size = vertical ? height : width
  const [shouldUpdate, setShouldUpdate] = React.useState(false)
  let offsetXConfig: IOpts = {
    handlerOffsetX,
    index,
    size,
    data,
    loop,
    ...(typeof customConfig === "function" ? customConfig() : {}),
  }

  if (mode === "horizontal-stack") {
    const { snapDirection, showLength } = modeConfig as ILayoutConfig

    offsetXConfig = {
      handlerOffsetX,
      index,
      size,
      data,
      loop,
      type: snapDirection === "right" ? "negative" : "positive",
      viewCount: showLength,
    }
  }

  const x = useOffsetX(offsetXConfig, visibleRanges)
  const animationValue = useDerivedValue(() => x.value / size, [x, size])
  const animatedStyle = useAnimatedStyle(() => animationStyle(x.value / size), [animationStyle])
  const updateView = React.useCallback(
    (negativeRange: number[], positiveRange: number[]) => {
      mounted.current &&
        setShouldUpdate(
          (index >= negativeRange[0] && index <= negativeRange[1]) ||
            (index >= positiveRange[0] && index <= positiveRange[1]),
        )
    },
    [index, mounted],
  )

  useAnimatedReaction(
    () => visibleRanges.value,
    () => {
      runOnJS(updateView)(visibleRanges.value.negativeRange, visibleRanges.value.positiveRange)
    },
    [visibleRanges.value],
  )
  return (
    <Animated.View
      style={[
        {
          width: width || "100%",
          height: height || "100%",
          position: "absolute",
          left: (screenWidth - width) / 2,
        },
        animatedStyle,
      ]}
    >
      <LazyView shouldUpdate={shouldUpdate}>{children({ animationValue })}</LazyView>
    </Animated.View>
  )
}
