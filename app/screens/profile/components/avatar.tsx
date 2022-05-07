import { StyleSheet, View } from "react-native";
import React from "react";
import { FImage, Text } from "~app/components";

export function Avatar() {
  return (
    <View>
      <FImage
        resizeMode={"contain"}
        source={{
          uri:
            "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/272465074_681586782837019_5648503663659630123_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=174925&_nc_ohc=P3q93ZAZ5w8AX8Khc5p&tn=OADuMgoVxpHifgnM&_nc_ht=scontent.fhan14-1.fna&oh=00_AT9MhM_MvPEObqXbN-jEnIf_Xt8-7SytELs2kgahMCLG8w&oe=626FFDC3",
        }}
        style={styles.img}
      />
      <Text style={styles.name} preset={"header"} text={"Grey"} />
      <Text
        style={styles.name}
        preset={"fieldLabel"}
        text={"Hello, nice to meet you Grey!"}
      />
    </View>
  );
}

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
});
