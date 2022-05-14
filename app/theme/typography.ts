import { Platform } from "react-native";

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  bold: Platform.select({ ios: "Quicksand-Bold", android: "Quicksand-Bold" }),
  medium: Platform.select({
    ios: "Quicksand-Medium",
    android: "Quicksand-Medium",
  }),
  regular: Platform.select({
    ios: "Quicksand-Regular",
    android: "Quicksand-Regular",
  }),
  light: Platform.select({
    ios: "Quicksand-Light",
    android: "Quicksand-Light",
  }),
  semiBold: Platform.select({
    ios: "Quicksand-SemiBold",
    android: "Quicksand-SemiBold",
  }),
};
