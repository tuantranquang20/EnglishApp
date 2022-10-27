import PushNotification, {
  Importance,
  PushNotificationPermissions,
} from "react-native-push-notification"
import messaging from "@react-native-firebase/messaging"
import { onRegistrationAWS } from "./aws"

class RNPushNotificationClass {
  private lastNotificationId: number = 0
  constructor() {
    this.createDefaultChannels()

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0)
      }
    })

    PushNotification.getChannels((channels) => {
      console.log(channels)
    })

    // Register background handler to avoid Warning: No task registered for key ReactNativeFirebaseMessagingHeadlessTask
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage)
    })
  }

  /**
   * Must be outside of any component LifeCycle (such as `componentDidMount`).
   */
  config = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token: any) => {
        onRegistrationAWS({ deviceToken: token.token })
        console.log("TOKEN:", token)
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: (notification: any) => {
        console.log("NOTIFICATION:", notification)
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: (notification: any) => {
        console.log("ACTION:", notification.action)
        console.log("NOTIFICATION:", notification)

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: (err: any) => {
        console.error(err.message, err)
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    })
  }

  /**
   * Create Channel feature only makes sense for Android.
   *
   * The app must create a channel with this channel ID before any notification
   * with this channel ID is received. If you don't send this channel ID in the
   * request, or if the channel ID provided has not yet been created by the app, FCM uses
   * the channel ID specified in the app manifest.
   */
  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: "Default channel", // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    )
    PushNotification.createChannel(
      {
        channelId: "sound-channel-id", // (required)
        channelName: "Sound channel", // (required)
        channelDescription: "A sound channel", // (optional) default: undefined.
        soundName: "funny_notification.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    )
  }

  /**
   * To show a "local" push notification, call this function.
   * You no need to manually handle to show "remote" notification. It handled by FCM SDK automatically.
   *
   * @param {string} soundName - Name of sound file.
   */
  triggerLocalNotification = (soundName: string) => {
    this.lastNotificationId++
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: soundName ? "sound-channel-id" : "default-channel-id",
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      /* iOS only properties */
      category: "", // (optional) default: empty string
      // subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: this.lastNotificationId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "Local Notification", // (optional)
      message: "My Notification Message", // (required)
      userInfo: { screen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: !!soundName, // (optional) default: true
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    })
  }

  /**
   * Check if your app has been granted permission to display notifications.
   */
  checkPermissions = (cb: (permissions: PushNotificationPermissions) => void) => {
    return PushNotification.checkPermissions(cb)
  }

  /**
   * Show popup to request permission to display notifications from user.
   */
  requestPermissions = () => {
    return PushNotification.requestPermissions()
  }

  /**
   * Abandon permission to display notifications.
   */
  abandonPermissions = () => {
    PushNotification.abandonPermissions()
  }
}

export const RNPushNotification = new RNPushNotificationClass()
