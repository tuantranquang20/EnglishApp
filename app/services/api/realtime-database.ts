import database from "@react-native-firebase/database";

const ref = (collection = "") => {
  const fRef = database().ref("englishApp").child(collection);
  return fRef;
};

export const createReading = async () => {
  const result = await ref("reading")
    .child("lessonOne")
    .child("title")
    .set("Fruit");
  console.log(result);
};

export const getDataFromRealTimeDB = async () => {
  await ref("listening")
    .child("lessonOne")
    .child("data")
    // .child("1651464619623")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
    });
  //   console.log(result);
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

export const getDataLesson = async () => {
  await ref("reading").on("value", (snapshot) => {
    console.log(snapshot.val());
  });
  //   console.log(result);
};
