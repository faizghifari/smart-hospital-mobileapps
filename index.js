/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import camera from './src/components/Utilities/Camera'
import chart from './src/components/Charts/EngChart'
import Wo from './src/components/Users/Engineer/WorkOrder'
import eng from './src/components/Menu/Engineer'
import Tes from './Tes'
import menu from './src/components/Menu/MOH'
import Home from './src/components/Home'

AppRegistry.registerComponent(appName, () =>  Wo);
