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
import React, { useCallback, useEffect, useState } from "react"
import { color } from "~app/theme"
import { Button, Card, Text, TextField } from "~app/components"
import { showMessages } from "~app/components/alert/Alert"
import { useNavigation } from "@react-navigation/native"
import { isIOS } from "~app/utils/helper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppApi } from "~app/services/api/app-api"
import { useStores } from "~app/models"

const { width } = Dimensions.get("screen")

export const SettingScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [user, setUser] = useState({
    username: "",
    email: "",
  })

  const { user: userStore } = useStores()

  const getAllData = useCallback(async () => {
    const appApi = new AppApi()
    const user = await appApi.getUser(userStore.userInformation._id)

    if (user?.data) {
      setUser({ email: user?.data?.email, username: user?.data?.username })
    }
  }, [])

  useEffect(() => {
    getAllData()
  }, [])

  const handlePress = async () => {
    try {
      const appApi = new AppApi()
      const response = await appApi.updateUser(userStore.userInformation._id, {
        username: user.username,
      })
      if (response?.data) {
        await userStore.setUserStore({
          ...userStore.userInformation,
          username: response?.data?.username,
        })
        showMessages("Success", "Update successfully")
      } else {
        showMessages("Error", response?.message)
      }
    } catch (e) {
      Alert.alert("Error", e.message)
    }
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
        <Text preset={"bold"} style={[styles.intro, { marginTop: insets.top + 70 }]}>
          Update information
        </Text>
        <Card style={styles.card}>
          <TextField
            sLabel={styles.sLabel}
            label="Email"
            inputStyle={[styles.border, styles.disable]}
            editable={false}
            value={user.email}
          />
          <TextField
            sLabel={styles.sLabel}
            label="Username"
            value={user.username}
            inputStyle={styles.border}
            keyboardType="email-address"
            onChangeText={(text) => setUser({ ...user, username: text })}
          />
          <Button text="Update" style={styles.btn} onPress={handlePress} />
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
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
  backIcon: {
    height: 20,
    tintColor: color.palette.lightGrey,
    width: 20,
  },
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
  disable: {
    backgroundColor: color.palette.disable,
  },
  img: {
    height: 200,
    width: width,
  },
  intro: {
    fontSize: 25,
    marginLeft: 15,
    position: "absolute",
  },
  sLabel: {
    backgroundColor: color.palette.white,
    marginLeft: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
})
