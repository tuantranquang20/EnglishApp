import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { color } from "~app/theme";
import { Button, Card, Screen, TextField } from "~app/components";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { showMessages } from "~app/components/alert/Alert";
import { useNavigation } from "@react-navigation/native";

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const createUser = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (response) {
        const uid = auth().currentUser.uid;
        auth().currentUser.updateProfile({
          displayName: user.displayName,
        });
        if (uid) {
          const usersReference = database()
            .ref("englishApp")
            .child("users")
            .child(uid);
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
              Alert.alert("Error", e.message);
            });
          showMessages("Sign up successfully", "Login now!", () =>
            navigation.goBack()
          );
        }
      }
    } catch (e) {
      console.log("e", e);
      Alert.alert("Error", e.message);
    }
  };

  const handlePress = () => {
    createUser();
  };
  return (
    <Screen
      preset="fixed"
      back
      backStyle={styles.top0}
      unsafe
      style={styles.container}
    >
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
    </Screen>
  );
};

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
    paddingVertical: 50,
  },
  container: {
    backgroundColor: color.palette.white,
    justifyContent: "center",
    paddingBottom: 100,
  },
  sLabel: {
    backgroundColor: color.palette.white,
    marginLeft: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  top0: {
    top: 0,
  },
});
