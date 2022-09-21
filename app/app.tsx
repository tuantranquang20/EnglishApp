import "./i18n"
import "./utils/ignore-warnings"
import * as React from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import SplashScreen from "react-native-lottie-splash-screen"
import "react-native-gesture-handler"
import messaging from "@react-native-firebase/messaging"
import { Alert } from "react-native"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
function App() {
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(undefined)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  React.useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      await setupRootStore().then(setRootStore)
    })()
  }, [])
  React.useEffect(() => {
    SplashScreen.hide() // here
    requestUserPermission()
  }, [])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const token = await messaging().getToken()
    console.log('token', token)
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log("Authorization status:", authStatus)
    }
  }
  // eEeSrLxsQvSg1j9waB-rno:APA91bGWPSrq5unsUDdhocZGic7f56nNBfWXAZg3ZVqpdnACDZC6Jo1U1Xh1BU1mY6rS9HquBstf7kuYL7NrEK1KWYt4HMNNz5mZd2HMgC2dzpjQdVwoQ8ar3m52WJprdkwBxNZOZLXD
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('remoteMessage', remoteMessage)
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  if (!rootStore || !isNavigationStateRestored) return null
  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={"always"}>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ErrorBoundary>
        </SafeAreaProvider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
}

export default App
