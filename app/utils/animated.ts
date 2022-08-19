import Animated from "react-native-reanimated"

const { event } = Animated

export const onScrollEvent = (contentOffset: {
  x?: Animated.Node<number>
  y?: Animated.Node<number>
}) =>
  event([
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ])
