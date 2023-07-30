import { Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "~app/components"
import { useStores } from "~app/models"
import { observer } from "mobx-react-lite"

export const Avatar = observer(() => {
  const { user } = useStores()
  const { userInformation } = user

  return (
    <View>
      <Image
        resizeMode={"cover"}
        style={styles.img}
        source={require("../../../../assets/images/avt.jpeg")}
      />
      <Text style={styles.name} preset={"header"} text={userInformation?.username} />
      <Text
        style={styles.name}
        preset={"fieldLabel"}
        text={`Hello, nice to meet you ${userInformation?.username}!`}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  img: {
    alignSelf: "center",
    borderRadius: 75,
    height: 150,
    marginTop: -75,
    width: 150,
  },
  name: {
    textAlign: "center",
    marginTop: 10,
  },
})
