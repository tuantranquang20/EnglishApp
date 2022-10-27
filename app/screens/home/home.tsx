import { StyleSheet } from "react-native"
import React from "react"
import { Button, Screen } from "~app/components"
import { HomeHeader } from "~app/components/header/home-header"
import { Content } from "./components/content"
import { RouteName } from "~app/navigators/constants"
import PushNotification from "react-native-push-notification"
const learn = [
  {
    title: "Reading",
    icon: require("../../../assets/lotties/book.json"),
    screen: RouteName.LessonReadingScreen,
    des: "Reading",
  },
  {
    title: "Listening",
    icon: require("../../../assets/lotties/headphone1.json"),
    screen: RouteName.LessonListingScreen,
    des: "Listening",
  },
  {
    title: "Grammar",
    icon: require("../../../assets/lotties/grammar.json"),
    screen: RouteName.LessonGrammarScreen,
    des: "Grammar",
  },
]
export function HomeScreen() {
  return (
    <Screen style={styles.container} preset="scroll" statusBar="dark-content">
      <HomeHeader />
      <Button
        onPress={() => {
          PushNotification.localNotification({
            channelId: "default-channel-id",
            ticker: "ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "", // (optional) default: "message" prop
            subText: "", // (optional) default: none
            color: "#113A58", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 10000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: "aw_sleep_analysis", // (optional) add tag to message
            group: "group", // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (opt// (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
            date: new Date(Date.now() + 1 * 1000),
            allowWhileIdle: false,
            repeatTime: 1,
            title: "Local Notification", // (optional)
            message: "My Notification Message", // (required)
          })
        }}
      />
      {learn.map((el, index) => (
        <Content item={el} key={`k-${index}`} />
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
})
