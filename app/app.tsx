import "./i18n";
import "./utils/ignore-warnings";
import * as React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { initFonts } from "./theme/fonts"; // expo
import * as storage from "./utils/storage";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import { RootStore, RootStoreProvider, setupRootStore } from "./models";
import { ToggleStorybook } from "../storybook/toggle-storybook";
import { ErrorBoundary } from "./screens/error/error-boundary";
import SplashScreen from "react-native-lottie-splash-screen";
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";
function App() {
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(
    undefined
  );
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  React.useEffect(() => {
    (async () => {
      await initFonts(); // expo
      await setupRootStore().then(setRootStore);
    })();
  }, []);
  React.useEffect(() => {
    SplashScreen.hide(); // here
  }, []);

  if (!rootStore || !isNavigationStateRestored) return null;
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
  );
}

export default App;
