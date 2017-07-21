/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import "SpotifyModule.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Eventunes"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [[FBSDKApplicationDelegate sharedInstance] application:application
        didFinishLaunchingWithOptions:launchOptions];
           
  return YES;
}

- (BOOL)application:(UIApplication *)application 
        openURL:(NSURL *)url 
        sourceApplication:(NSString *)sourceApplication 
        annotation:(id)annotation {

  // Creates a string from the URL
  NSString *myString = url.absoluteString;
  
  // Extracts the prefix of the string (all before the colon)
  NSString *prefix = [myString componentsSeparatedByString:@":"][0];
  
  // Callback for Spotify Auth
  if ([prefix isEqualToString:@"eventunes-spotify"])
  {
    return [SpotifyModule application:application
                              openURL:url
                    sourceApplication:sourceApplication
                           annotation:annotation];
  }
  // Callback for anything else (only Facebook here)
  else
  {
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance]
                    application:application
                    openURL:url
                    sourceApplication:sourceApplication
                    annotation:annotation
                    ];
    
    
    return handled;
  }

  
}

@end

