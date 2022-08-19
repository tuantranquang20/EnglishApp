import React from "react";
import { View, StyleSheet, Image } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "~app/components";
import { color } from "~app/theme";
import { useStores } from "~app/models";

export function DrawerContent(props) {
  const { user } = useStores();
  const { userInformation } = user;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Image
                style={styles.avt}
                source={require("../../assets/images/avt.jpeg")}
              />
              <View style={{ marginLeft: 15, justifyContent: "center" }}>
                <Text
                  style={styles.title}
                  text={`${userInformation?.displayName || "Hello!"}`}
                />
                <Text
                  style={styles.caption}
                  text={`${userInformation?.email || "ops@gmail.com"}`}
                />
              </View>
            </View>
          </View>
          <View style={styles.v_dash}>
            <View style={styles.dash} />
          </View>

          <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avt: {
    alignSelf: "center",
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  caption: {},
  dash: {
    borderColor: color.palette.lighterGrey,
    borderStyle: "dashed",
    borderWidth: 1,
    height: 2,
  },
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },
  userInfoSection: {
    paddingBottom: 15,
    paddingLeft: 15,
  },
  v_dash: {
    height: 1,
    overflow: "hidden",
  },
});
