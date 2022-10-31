import {
  Alert,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { color } from "~app/theme"
import { Button, Card, Text, TextField } from "~app/components"
import { StackActions, useNavigation } from "@react-navigation/native"
import { AppStacks, RouteName } from "~app/navigators/constants"
import auth from "@react-native-firebase/auth"
import { navigate } from "~app/navigators"
import { useStores } from "~app/models"
import { isIOS } from "~app/utils/helper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("screen")

export const LoginScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const { user: userStore } = useStores()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const loginWithFirebase = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(user.email, user.password)
      if (response && response.user) {
        const { user } = response
        await userStore.setUserStore({
          email: user.email,
          displayName: user.displayName,
        })
        navigation.dispatch(
          StackActions.replace(
            AppStacks.BottomTab as never,
            {
              screen: RouteName.HomeScreen,
            } as never,
          ),
        )
      }
    } catch (e) {
      Alert.alert("Error", e.message)
    }
  }

  const handlePress = () => {
    loginWithFirebase()
  }
  const goToSignUp = () => {
    navigate(RouteName.RegisterScreen)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={isIOS ? "padding" : undefined}
        keyboardVerticalOffset={undefined}
      >
        <Image
          resizeMode={"stretch"}
          source={require("../../../assets/images/bg.png")}
          style={styles.img}
        />
        <Text preset={"bold"} style={[styles.intro, { marginTop: insets.top + 70 }]}>
          Welcome to English App
        </Text>
        <Card style={styles.card}>
          <TextField
            sLabel={styles.sLabel}
            label="Email"
            inputStyle={styles.border}
            keyboardType="email-address"
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <TextField
            sLabel={styles.sLabel}
            label="Password"
            inputStyle={styles.border}
            secureTextEntry={true}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
          <Button text="Sign in" style={styles.btn} onPress={handlePress} />
          <TouchableOpacity onPress={goToSignUp} style={styles.signUp}>
            <Text style={styles.textSignUp} text={"Do not have an account? "} />
            <Text style={styles.textSignUp} text={"Sign Up"} />
          </TouchableOpacity>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  border: {
    borderColor: color.palette.lighterGrey,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    marginVertical: 15,
  },
  card: {
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 50,
  },
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  img: {
    height: 200,
    width: width,
  },
  sLabel: {
    backgroundColor: color.palette.white,
    marginLeft: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  signUp: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    height: 30,
  },
  textSignUp: {
    color: color.palette.orangeDarker,
    fontSize: 13,
  },
  intro: {
    position: "absolute",
    fontSize: 25,
    marginLeft: 15,
  },
})
