import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "./screen.props";
import { isNonScrolling, offsets, presets } from "./screen.presets";
import { color } from "~app/theme";
import { useNavigation } from "@react-navigation/native";

const isIos = Platform.OS === "ios";

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.inner, style, insetStyle]}>
        {props?.back && (
          <TouchableOpacity
            style={[
              styles.back,
              props.backStyle,
              { marginTop: insets.top + 10 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../../assets/images/back.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        )}
        {props.children}
      </View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || "handled"
          }
          showsVerticalScrollIndicator={false}
        >
          {props?.back && (
            <TouchableOpacity
              style={[
                styles.back,
                props.backStyle,
                { marginTop: insets.top + 10 },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../../../assets/images/back.png")}
                style={styles.img}
              />
            </TouchableOpacity>
          )}
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    backgroundColor: color.palette.white,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    justifyContent: "center",
    marginLeft: 15,
    position: "absolute",
    shadowColor: color.palette.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 40,
    zIndex: 1,
  },
  img: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
});
