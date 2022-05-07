import firestore from "@react-native-firebase/firestore";

const fStore = (collection) => {
  return firestore().collection(collection);
};

// fix later
export const setMultiEntity = async (data, collection, exercise, practice) => {
  const batch = firestore().batch();
  data.forEach((doc) => {
    const docRef = fStore(collection).doc(exercise).collection(practice).doc();
    batch.set(docRef, doc);
  });
  await batch.commit();
};

export const getAllEntity = async (data) => {
  const { collection, exercise, practice } = data;
  return await fStore(collection).doc(exercise).collection(practice).get();
};
export const addEntity = async (data) => {
  const { collection, exercise, practice, item } = data;
  return await fStore(collection).doc(exercise).collection(practice).add(item);
};
export const getAllEntityByQuery = async (data) => {
  const { collection, exercise, practice } = data;
  return await fStore(collection)
    .doc(exercise)
    .collection(practice)
    .limit(3)
    .get();
};
// export const getCollection = async (data) => {
//   const { collection, exercise } = data;
//   // const sfRef = fStore(collection).doc(exercise);
//   // const collections = await sfRef.();
//   // collections.forEach((collection) => {
//   //   console.log("Found subcollection with id:", collection.id);
//   // });
//   // index.js;
//   // return await fStore(collection).doc(exercise).get({
//   //   source: "server",
//   // });
//   // const citiesRef = fStore(collection).doc(exercise);
//   // const snapshot = await citiesRef.collection("reading").get();
//   // console.log(snapshot)
//   // snapshot.forEach(doc => {
//   //   console.log(doc.id, '=>', doc.data());
//   // });
//   const snapshot = await fStore(collection).doc(exercise).get();
//   console.log(snapshot)
//   return snapshot.map((doc) => doc.data());
// };
export const testF = async (data) => {
  const { collection, exercise } = data;
  const result = await fStore("a").get();
  console.log(result.docs[0].data(), "result");
  // const batch = firestore().batch();
  // const docRef = fStore(collection).doc();
  // batch.set(docRef, {
  //   word: "Apple",
  //   translateWord: "Quả Táo",
  //   image:
  //     "https://cdn.picpng.com/apple/apple-apple-tree-fruits-fruit-46395.png",
  //   description: "",
  //   pronunciation: "ˈapəl",
  // });
  // batch.commit();
};
