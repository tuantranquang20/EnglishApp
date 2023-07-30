import database from "@react-native-firebase/database"
import map from "lodash/map"
import auth from "@react-native-firebase/auth"

const convertObjectToArray = (obj) => {
  const result = map(obj, (value, key) => {
    return { ...value, key }
  })
  return result
}

const ref = (collection = "") => {
  const fRef = database().ref("englishApp").child(collection)
  return fRef
}

export const createReading = async () => {
  await ref("reading")
    .child("lessonFive")
    .child("data")
    .once("value", () => {
      ref("reading").child("lessonFive").child("data").push({
        word: "Cabbage",
        translateWord: "Cả bắp",
        image:
          "https://www.picpng.com/_next/image?url=https%3A%2F%2Fcdn.picpng.com%2Fcabbage%2Fcabbage-vegetable-food-fresh-93576.png&w=3840&q=100",
        description: "",
        pronunciation: "ˈkabij",
      })
    })
}

export const getDataFromRealTimeDB = async (data, callback) => {
  await ref(data?.collection)
    .child(data?.lesson)
    .child("data")
    .on("value", (snapshot) => {
      callback(convertObjectToArray(snapshot.val()))
    })
}
export const getDataFromRealTimeDBForReading = async (data, callback) => {
  await ref(data?.collection)
    .child(data?.lesson)
    .child("data")
    .on("value", (snapshot) => {
      callback(snapshot.val())
    })
}
export const createSpeaking = async () => {
  const result = await ref("speaking")
    .child("lessonOne")
    .child("data")
    .set({
      rawWord: "Hi, how are you?",
      words: ["hi", "how", "are", "you"],
    })
  console.log(result)
}

export const getLearningLesson = async (type, callback) => {
  if (auth().currentUser) {
    await database()
      .ref("englishApp")
      .child("userLearning")
      .child(auth().currentUser?.uid)
      .child(type)
      .on("value", (snapshot) => {
        callback(snapshot.val())
      })
  }
}

export const getDataLesson = async (data, callback) => {
  await ref(data?.collection).on("value", (snapshot) =>
    callback(convertObjectToArray(snapshot.val())),
  )
}

export const updateLearningLesson = async (data) => {
  if (auth().currentUser) {
    await database()
      .ref("englishApp")
      .child("userLearning")
      .child(auth().currentUser?.uid)
      .child(data?.type)
      .update({
        [data?.lesson]: data?.percent,
      })
  }
}
export const createListening = async () => {
  await ref("listening")
    .child("lessonSeven")
    .child("data")
    .once("value", () => {
      ref("listening")
        .child("lessonSeven")
        .child("data")
        .push({
          words: ["will", "will be", "was"],
          answer: "will be",
          question: "It ___ impossible",
          rawAnswer: "It will be impossible",
          type: "selectWord",
          // type: "selectCell",
          // rawAnswer: "Is",
          // words: ["Is", "Am", "Are"],
        })
    })
}
// Possessives
