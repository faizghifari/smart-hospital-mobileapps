// @flow
"use strict";

import { AppRegistry } from "react-native";
import App from "./App";

import * as RNEP from "@estimote/react-native-proximity";

AppRegistry.registerComponent("SmartHospital", () => App);

// will trigger when the user is within ~ 5 m of any beacon with tag "lobby"
// you can add tags to your beacons on https://cloud.estimote.com, in Beacon Settings
const zone1 = new RNEP.ProximityZone(5, "coconut");
zone1.onEnterAction = context => {
  // context properties are:
  // - attachments: all the key-value attachments assigned in Estimote Cloud to the beacon that triggered the action
  // - tag: the tag used when defining the zone, repeated here for convenience
  // - deviceIdentifier: Estimote-specific device identifier of the beacon that triggered the action
  console.log("zone1 onEnter", context);
};
zone1.onExitAction = context => {
  console.log("zone1 onExit", context);
};
zone1.onChangeAction = contexts => {
  // onChange event gives you granular data about which exact beacons are in range
  //
  // imagine there are 2 beacons tagged "lobby", to help cover the entire lobby area
  // here's an example sequence of events:
  //
  // 1. when you enter the range of the 1st one, you'll get:
  // lobby onEnter
  // lobby onChange with array [beacon1's context]
  //
  // 2. when you enter the range of the 2nd one, and are still in range of the 1st one:
  // lobby onChange with array [beacon1's context, beacon2's context]
  //
  // 3. when you exit the range of the 1st one, but are still in range of the 2nd one:
  // lobby onChange with array [beacon2's context]
  //
  // 4. when you finally exit the range of the 2nd one:
  // lobby onChange with empty array []
  // lobby onExit
  console.log("zone1 onChange", contexts);
};

const zone2 = new RNEP.ProximityZone(5, "conf-room");
zone2.onEnterAction = context => {
  console.log("zone2 onEnter", context);
};
zone2.onExitAction = context => {
  console.log("zone2 onExit", context);
};
zone2.onChangeAction = contexts => {
  console.log("zone2 onChange", contexts);
};

// detecting Bluetooth beacons is considered as knowing the user's location (because you know when the user is in the lobby
// or in the conference room), and so on both iOS and Android it requires asking the user for permission to use their location
//
// on Android, it'll be a simple "yes/no" popup
// on iOS, the user can choose between "never", "only when using the app" and "always" (background)
//
// see also: "Location permission" and "Background support" sections in the README
RNEP.locationPermission.request().then(
  permission => {
    // `permission` will be one of RNEP.locationPermission.DENIED, .ALWAYS, or .WHEN_IN_USE
    console.log(`location permission: ${permission}`);

    if (permission !== RNEP.locationPermission.DENIED) {
      // generate Estimote Cloud credentials for your app at:
      // https://cloud.estimote.com/#/apps/add/your-own-app
      const credentials = new RNEP.CloudCredentials(
        "rezkyal2-gmail-com-s-your--ihm",
        "a0683bba3c43828e87bffdd608dbdefb"
      );

      const config = {
        // modern versions of Android require a notification informing the user that the app is active in the background
        // if you don't need proximity observation to work in the background, you can omit the entire `notification` config
        //
        // see also: "Background support" section in the README
        notification: {
          title: "Exploration mode is on",
          text: "We'll notify you when you're next to something interesting."
          //icon: 'my_drawable' // if omitted, will default to the app icon (i.e., mipmap/ic_launcher)
        }
      };

      RNEP.proximityObserver.initialize(credentials, config);
      // RNEP.proximityObserver.startObservingZones([zone1, zone2]);
    }
  },
  error => {
    console.error("Error when trying to obtain location permission", error);
  }
);
