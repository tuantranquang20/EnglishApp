export enum AppStacks {
  BottomTab = "BottomTab",
  HomeStack = "HomeStack",
}
export enum AppBottomTab {
  Home = "Home",
  Save = "Save",
  Profile = "Profile",
}
export enum RouteName {
  HomeScreen = "HomeScreen",
  SaveScreen = "SaveScreen",
  ProfileScreen = "ProfileScreen",
  ReadingScreen = "ReadingScreen",
  SpeakingScreen = "SpeakingScreen",
  ListeningScreen = "ListeningScreen",
  GrammarScreen = "GrammarScreen",
}
export type NavigatorParamList = {
  [RouteName.HomeScreen]: undefined
  [RouteName.ProfileScreen]: undefined
  [RouteName.SaveScreen]: undefined
  [RouteName.ReadingScreen]: undefined
  [RouteName.SpeakingScreen]: undefined
  [RouteName.ListeningScreen]: undefined
  [RouteName.GrammarScreen]: undefined
}
