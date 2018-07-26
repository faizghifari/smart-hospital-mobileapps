// @flow
"use strict";

import { AppRegistry } from "react-native";
import App from "./App";
import Asset from "./component/Detail/Asset.js";
import StartMenu from "./component/Menu/StartMenu.js";
import Statistics from "./component/Menu/Statistics.js";
import AssetsManagement from "./component/Menu/AssetsManagement.js";
import Maps from "./component/Menu/Maps.js";
import PPMForm from "./component/Detail/PPMForm.js";
import QRScanner from "./component/Sensor/QRScanner.js";

AppRegistry.registerComponent("SmartHospital", () => PPMForm);
