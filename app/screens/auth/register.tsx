import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import React, { useState } from "react"
import { color } from "~app/theme"
import { Button, Card, Screen, TextField } from "~app/components"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import { showMessages } from "~app/components/alert/Alert"
import { useNavigation } from "@react-navigation/native"
import { isIOS } from "~app/utils/helper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width } = Dimensions.get("screen")

export const RegisterScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [user, setUser] = useState({
    email: "",
    password: "",
    displayName: "",
  })

  const createUser = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(user.email, user.password)
      if (response) {
        const uid = auth().currentUser.uid
        auth().currentUser.updateProfile({
          displayName: user.displayName,
        })
        if (uid) {
          const usersReference = database().ref("englishApp").child("users").child(uid)
          usersReference
            .set({
              name: user.email,
              email: user.displayName,
              uid: uid,
              photoUrl: "default",
            })
            .then(() => {
              // set user in store
            })
            .catch((e) => {
              Alert.alert("Error", e.message)
            })
          showMessages("Sign up successfully", "Login now!", () => navigation.goBack())
        }
      }
    } catch (e) {
      console.log("e", e)
      Alert.alert("Error", e.message)
    }
  }

  const handlePress = () => {
    createUser()
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
        <TouchableOpacity
          style={[styles.back, { marginTop: insets.top + 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../../assets/images/back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Card style={styles.card}>
          <TextField
            sLabel={styles.sLabel}
            label="Name"
            inputStyle={styles.border}
            keyboardType="default"
            onChangeText={(text) => setUser({ ...user, displayName: text })}
          />
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
          <Button text="Sign up" style={styles.btn} onPress={handlePress} />
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
  sLabel: {
    backgroundColor: color.palette.white,
    marginLeft: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  img: {
    height: 200,
    width: width,
  },
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
  backIcon: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
})
