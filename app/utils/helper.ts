import { Dimensions, Platform } from "react-native";
import { DuoAnimatedStyleWorklet } from "~app/components/doulingo";
import { withSpring, withTiming } from "react-native-reanimated";

export function isIphoneX() {
  const dimen = Dimensions.get("window");
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
  );
}
export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
export const isIOS = Platform.OS === "ios";

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

export const getLottieRandom = () => {
  const lotties = [
    require("../../assets/lotties/fox.json"),
    require("../../assets/lotties/bee.json"),
    require("../../assets/lotties/star-in-hand-baby-astronaut.json"),
    require("../../assets/lotties/satisfied-bear.json"),
    require("../../assets/lotties/little-robot-icon.json"),
    require("../../assets/lotties/owl.json"),
  ];
  return lotties[Math.floor(Math.random() * lotties.length)];
};
export const getSuccessLottie = () => {
  const lotties = [
    require("../../assets/lotties/success1.json"),
    require("../../assets/lotties/success10.json"),
    require("../../assets/lotties/success3.json"),
    require("../../assets/lotties/success5.json"),
    require("../../assets/lotties/success6.json"),
    require("../../assets/lotties/success9.json"),
  ];
  return lotties[Math.floor(Math.random() * lotties.length)];
};
export const getFailedLottie = () => {
  const lotties = [
    require("../../assets/lotties/failed.json"),
    require("../../assets/lotties/failed1.json"),
    require("../../assets/lotties/failed3.json"),
    require("../../assets/lotties/failed4.json"),
    require("../../assets/lotties/failed6.json"),
    require("../../assets/lotties/failed7.json"),
  ];
  return lotties[Math.floor(Math.random() * lotties.length)];
};
