import AnimatedLottieView from "lottie-react-native";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "~app/theme";
import { getLottieRandom } from "~app/utils/helper";

interface Props {
  handlePressLottie: () => void;
}

const Header = (props: Props) => {
  const { handlePressLottie } = props;
  return (
    <View>
      <View style={styles.row}></View>
      <Text style={styles.title}>Translate this sentence</Text>
      <TouchableOpacity onPress={handlePressLottie} style={styles.rowImg}>
        <AnimatedLottieView
          style={styles.icon}
          autoPlay={true}
          loop={true}
          source={getLottieRandom()}
        />
        <AnimatedLottieView
          style={styles.mess}
          autoPlay={true}
          loop={true}
          source={require("../../../../assets/lotties/messages.json")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header, () => true);

const styles = StyleSheet.create({
  icon: {
    height: 200,
    width: 200,
  },
  mess: {
    height: 50,
    marginTop: 10,
    transform: [
      {
        translateX: -15,
      },
    ],
    width: 50,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  rowImg: {
    flexDirection: "row",
  },
  title: {
    fontFamily: typography.semiBold,
    fontSize: 24,
    paddingLeft: 15,
  },
});
