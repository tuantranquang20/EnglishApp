import { Dimensions, Platform } from "react-native"
import { DuoAnimatedStyleWorklet } from "~app/components/doulingo"
import { withSpring, withTiming } from "react-native-reanimated";

export function isIphoneX() {
  const dimen = Dimensions.get("window")
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  )
}
export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0
}
export const isIOS = Platform.OS === "ios"

export const customAnimatedStyle: DuoAnimatedStyleWorklet = (
  style,
  isGestureActive
) => {
  "worklet";
  style.transform.push({
    scale: withTiming(isGestureActive ? 1.5 : 1, { duration: 250 }),
  });
  style.opacity = withTiming(isGestureActive ? 0.8 : 1, { duration: 250 });
  style.top = withTiming(isGestureActive ? -10 : 0, { duration: 250 });

  if (!isGestureActive) {
    style.transform[0].translateX = withSpring(style.transform[0].translateX);
    style.transform[1].translateY = withSpring(style.transform[1].translateY);
  }

  return style;
};