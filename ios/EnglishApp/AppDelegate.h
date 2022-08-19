#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import "RNSplashScreen.h" // here
#import "EnglishApp-Swift.h"

@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
