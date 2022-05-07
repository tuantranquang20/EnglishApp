// Initialize Firebase
import reactotron from "reactotron-react-native"
import { Platform } from "react-native"
// import {getAvatar} from './helper';


const listUser = [2, 4, 5, 6, 7, 8, 9, 10]
const listSale = [20, 21, 22, 23, 24, 25]
const listCustomerCare = [80, 82, 85, 89, 92, 95, 113, 136, 141, 147, 148]
const listCounsellor = [79, 81, 84, 87, 91, 133, 212, 220, 250, 251, 252]

const CHAT_ROOM = "chat_room"
const LIST_ID = "list_id"
const BASE = "base"
class Fire {
  constructor() {
    this.prepareInit()
  }

  static shared = Fire.shared || new Fire()

  prepareInit = () => {
    this.init()
  }

  init = () => {
    var firebaseConfig = {
      apiKey: "AIzaSyAvajgUYNJjbRCySJB1JejiGmyOrbZY_t4",
      authDomain: "chatapp-feb0f.firebaseapp.com",
      databaseURL: "https://chatapp-feb0f.firebaseio.com",
      projectId: "chatapp-feb0f",
      storageBucket: "chatapp-feb0f.appspot.com",
      messagingSenderId: "935081555712",
      appId: "1:935081555712:web:aa9b70ad8fdd56400625e5",
      measurementId: "G-HJN358CBYN",
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  ref(room = "") {
    let usersRef = firebase.database().ref(BASE).child(room)
    return usersRef
  }

  checkExistUser = async (userID, deviceId = "khong lay dc") => {
    const res = await this.ref(LIST_ID).child(userID).once("value")
    reactotron.log(res, "resCheckExistUserID")
    this.handleCheckExistUser(userID, deviceId, !!res)
  }

  handleCheckExistUser = (userID, deviceId = "khong lay dc", isExist) => {
    reactotron.log("handleCheckExistUser")
    if (isExist) {
      this.ref(LIST_ID).child(userID).child("device_id").set(deviceId)

      this.resetFocus(userID)
    } else {
      this.ref(LIST_ID).child(userID).set({
        device_id: deviceId.toString(),
        focus: 0,
        list_chat: "",
      })
    }
  }

  checkExistConversation = (userID1, userID2, callback) => {
    const idConversation = this.getIdConversation(userID1, userID2)

    this.ref(CHAT_ROOM)
      .child(idConversation)
      .once("value", (snapshot) => {
        let isExistConversation = !!snapshot.val()
        reactotron.log("checkExistConversation", isExistConversation)
        callback(isExistConversation)
      })
  }

  getIdConversation = (userID1, userID2) => {
    const userID1Int = parseInt(userID1)
    const userID2Int = parseInt(userID2)
    const id = userID1 < userID2 ? `${userID1Int}${userID2Int}` : `${userID2Int}${userID1Int}`
    return id
  }

  getObjectChatWithUserID = (userID, callback) => {
    this.ref(LIST_ID)
      .child(userID)
      .on("value", (snapshot) => {
        callback(snapshot.val())
      })
  }

  createConversation = (userIDSend, userIDReceive, userSend, userReceive) => {
    const idConversation = this.getIdConversation(userIDSend, userIDReceive)

    this.ref(LIST_ID).child(userIDReceive).child("list_chat").child(userIDSend).set({
      avatar: userSend.avatar,
      chat_id: idConversation,
      name: userSend.name,
      read: 0,
    })

    this.ref(LIST_ID).child(userIDSend).child("list_chat").child(userIDReceive).set({
      avatar: userReceive.avatar,
      chat_id: idConversation,
      name: userReceive.name,
      read: 1,
    })

    this.createChatRoom(userIDSend, userIDReceive, userSend)
  }

  createChatRoom = (userID, userIDReceive, userSend) => {
    const idConversation = this.getIdConversation(userID, userIDReceive)

    const msg = R.strings.msg_auto_before + userSend.name + R.strings.msg_auto_after

    this.ref(CHAT_ROOM)
      .child(idConversation)
      .child("data")
      .child("0")
      .set({
        _id: 0,
        createdAt: Math.floor(new Date()),
        user: userSend,
        text: msg,
      })

    let data = {
      text: msg,
    }

    this.sendNotificationToUserReceive(data, userID, userIDReceive, userSend)
  }

  getConversation = (userID1, userID2, callback) => {
    const id = this.getIdConversation(userID1, userID2)
    this.ref(CHAT_ROOM)
      .child(id)
      .on("value", (snapshot) => callback(snapshot.val()))
    // reactotron.log(res)
  }

  on = (idUser, callback) => {
    // var res = null;
    this.ref(LIST_ID)
      .child(idUser)
      .on("value", (snapshot) => callback(snapshot.val()))
    // return res;
  }

  send = (userIDSend, userIDReceive) => (message, urlImage) => {
    var lengthObj = 0
    const idConversation = this.getIdConversation(userIDSend, userIDReceive)
    reactotron.log(message, "message")
    this.ref(CHAT_ROOM)
      .child(idConversation) //1415
      .child("data")
      .once("value", (snapshot) => {
        if (snapshot.val() !== null) {
          lengthObj = snapshot.val().length
        }

        this.ref(CHAT_ROOM)
          .child(idConversation)
          .child("data")
          .child(lengthObj.toString())
          .set({
            _id: message[0]._id,
            createdAt: Math.floor(new Date()),
            user: message[0].user,
            text: message[0].text,
            image: message[0].image || "",
          })

        this.ref(CHAT_ROOM).child(idConversation).child("time_modified").set(Math.floor(new Date()))

        this.updateTimeModified(userIDSend, userIDReceive)
      })

    this.sendNotificationToUserReceive(message[0], userIDSend, userIDReceive, message[0].user)
  }

  updateTimeModified = (userIDSend, userIDReceive) => {
    const timeModified = Math.floor(new Date())
    this.ref(LIST_ID)
      .child(userIDSend)
      .child("list_chat")
      .child(userIDReceive)
      .child("time_modified")
      .set(timeModified)

    this.ref(LIST_ID)
      .child(userIDReceive)
      .child("list_chat")
      .child(userIDSend)
      .child("time_modified")
      .set(timeModified)
  }

  getTimestampChatRoom = async (idConversation, callback) => {
    const time_modified = await this.ref(CHAT_ROOM)
      .child(idConversation)
      .child("time_modified")
      .once("value", (value) => value.val())
    reactotron.log(time_modified, idConversation, "getTimestampChatRoom")
    // return parseFloat(time_modified)
    callback(time_modified)
  }

  uploadImage = async (result) => {
    const imageURI = Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
    const name = new Date().getTime()

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", imageURI, true)
      xhr.send(null)
    })
    //dòng dưới chưa chạy
    const storageRef = firebase.storage().ref(`${BASE}/images/${name.toString()}`)
    // .ref(`${BASE_WINDS}/images/${name.toString()}`);
    try {
      const snapshot = await storageRef.put(blob)
      blob.close()
      return await snapshot.ref.getDownloadURL()
    } catch (error) {
      console.log(error, " ?")
    }
  }

  updateFocus = (userID1, userID2) => {
    const idConversation = this.getIdConversation(userID1, userID2)

    this.ref(LIST_ID).child(userID1).child("focus").set(idConversation)

    reactotron.log("updateFocus", idConversation)
  }

  resetRead = (userIDSend, userIDReceive) => {
    this.ref(LIST_ID).child(userIDSend).child("list_chat").child(userIDReceive).child("read").set(0)
  }

  resetFocus = (userID) => {
    this.ref(LIST_ID).child(userID).child("focus").set(0)

    reactotron.log("resetFocus")
  }

  resetDeviceId = (userID) => {
    this.ref(LIST_ID).child(userID).child("device_id").set("0")

    reactotron.log("resetDeviceId")
  }

  logout = (userID) => {
    this.resetDeviceId(userID)
    this.resetFocus(userID)
    this.off()
  }

  off() {
    this.ref(LIST_ID).off()
    this.ref(CHAT_ROOM).off()
  }

  oneSignalPushNotify = (message, userSend, deviceId) => {
    if (!deviceId) return
    var array = []
    array.push(deviceId)
    var myHeaders = new Headers()
    myHeaders.append("https", "//onesignal.com/api/v1/notifications")
    myHeaders.append("Authorization", "Basic :Y2U1MWU2ZjctYTA1My00ZDk2LTgxODYtMDhhMjRjNTkwMTBi")
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      data: {
        title: message || "Bạn có tin nhắn mới",
        description: message || "Bạn có tin nhắn mới",
        type: NOTIFI_TYPE.CHAT,
        userSend: userSend,
      },
      headings: { en: userSend.name.toString() || "Bạn có tin nhắn mới" },
      contents: { en: message || "Bạn có tin nhắn mới" },
      android_channel_id: ONESIGNAL_ANDROID_CHANNEL_ID,
      include_player_ids: array,
    })

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    fetch("https://onesignal.com/api/v1/notifications", requestOptions)
      .then((response) => response.text())
      .then((result) => reactotron.log(result))
      .catch((error) => reactotron.log("error", error))
  }

  sendNotificationToUserReceive = (data, userIDSend, userIDReceive, userSend) => {
    reactotron.log(data)
    // let userReceive = {}
    const idConversation = this.getIdConversation(userIDSend, userIDReceive)

    this.ref(LIST_ID)
      .child(userIDReceive)
      .once("value", (snapshot) => {
        var userReceive = snapshot.val()
        if (userReceive?.focus !== idConversation) {
          this.ref(LIST_ID)
            .child(userIDReceive)
            .child("list_chat")
            .child(userIDSend)
            .child("read")
            .set(1)
        }
        // if (
        //   userReceive?.device_id !== '0' &&
        //   userReceive?.focus !== idConversation
        // ) {
        //   // this.oneSignalPushNotify(data.text, userSend, userReceive?.device_id);

        //   reactotron.log(
        //     'oneSignalPushNotify',
        //     !!userReceive?.device_id && userReceive?.focus !== idConversation,
        //   );
        // } else {
        //   reactotron.log(
        //     'ko push',
        //     !!userReceive?.device_id && userReceive?.focus == idConversation,
        //   );
        // }
      })
    // reactotron.log(userReceive, 'userReceive')
  }

  // updateInListId = async (object) => {
  //   const res = await this.ref(LIST_ID)
  //     .child(object)
  //     .child('list_chat')
  //     .once('value');
  //   if (res != null) {
  //     const listUserID = Object.keys(res.val());
  //     reactotron.log(listUserID);

  //     listUserID.forEach((element) => {
  //       reactotron.log(typeof element);
  //       var url = getAvatar(USER_ROLE.USER);
  //       if (listUser.indexOf(parseInt(element)) != -1) {
  //         url = getAvatar(USER_ROLE.USER);
  //         reactotron.log('user');
  //       }
  //       if (listSale.indexOf(parseInt(element)) != -1) {
  //         url = getAvatar(USER_ROLE.SALE);
  //         reactotron.log('sale');
  //       }
  //       if (listCounsellor.indexOf(parseInt(element)) != -1) {
  //         url = getAvatar(USER_ROLE.COUNSELLOR);
  //         reactotron.log('counsellor');
  //       }
  //       if (listCustomerCare.indexOf(parseInt(element)) != -1) {
  //         url = getAvatar(USER_ROLE.CUSTOMER_CARE);
  //         reactotron.log('cusCare');
  //       }
  //       this.ref(LIST_ID)
  //         .child(object)
  //         .child('list_chat')
  //         .child(element)
  //         .child('avatar')
  //         .set(url);
  //     });
  //   }
  // };

  updateInListChatRoom = async () => {
    const listChatRoom = await this.ref(CHAT_ROOM).once("value")

    const listKeyChatRoom = Object.keys(listChatRoom.val())

    listKeyChatRoom.forEach((element) => {
      this.ref(CHAT_ROOM)
        .child(element)
        .child("data")
        .once("value", (snapshot) => {
          const listConversation = snapshot.val()
          listConversation.map((value, index) => {
            const id = value.user._id
            var url = getAvatar(USER_ROLE.SALE)
            if (listUser.indexOf(parseInt(id)) != -1) {
              url = getAvatar(USER_ROLE.USER)
              reactotron.log("user")
            }
            if (listSale.indexOf(parseInt(id)) != -1) {
              url = getAvatar(USER_ROLE.SALE)
              reactotron.log("sale")
            }
            if (listCounsellor.indexOf(parseInt(id)) != -1) {
              url = getAvatar(USER_ROLE.COUNSELLOR)
              reactotron.log("counsellor")
            }
            if (listCustomerCare.indexOf(parseInt(id)) != -1) {
              url = getAvatar(USER_ROLE.CUSTOMER_CARE)
              reactotron.log("cusCare")
            }

            this.ref(CHAT_ROOM)
              .child(element)
              .child("data")
              .child(index.toString())
              .child("user")
              .child("avatar")
              .set(url)
          })
        })
    })
  }
}

// Fire.shared = new Fire();
export default Fire
