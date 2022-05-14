import database from "@react-native-firebase/database";
import map from "lodash/map";

const convertObjectToArray = (obj) => {
  const result = map(obj, (value, key) => {
    return { ...value, key };
  });
  return result;
};

const ref = (collection = "") => {
  const fRef = database().ref("englishApp").child(collection);
  return fRef;
};

export const createReading = async () => {
  await ref("reading")
    .child("lessonTwo")
    .child("data")
    .once("value", () => {
      ref("reading").child("lessonTwo").child("data").push({
        word: "Lady",
        translateWord: "Quý bà",
        image: "",
        description: "",
        pronunciation: "ˈlādē",
      });
    });
};

export const getDataFromRealTimeDB = async (data, callback) => {
  await ref(data?.collection)
    .child(data?.lesson)
    .child("data")
    .on("value", (snapshot) => {
      callback(convertObjectToArray(snapshot.val()));
    });
};

export const createSpeaking = async () => {
  const result = await ref("speaking")
    .child("lessonOne")
    .child("data")
    .set({
      rawWord: "Hi, how are you?",
      words: ["hi", "how", "are", "you"],
    });
  console.log(result);
};

export const getDataLesson = async (callback) => {
  await ref("reading").on("value", (snapshot) =>
    callback(convertObjectToArray(snapshot.val()))
  );
};
