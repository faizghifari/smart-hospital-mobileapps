/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import camera from './src/components/Utilities/Camera'
import chart from './src/components/Charts/EngChart'
import Wo from './src/components/Menu/Medics'
import eng from './src/components/Menu/Engineer'
import Tes from './Tes'
import BookAsset from './src/components/Users/Medics/Booking/BookingScanner'
import cal from './src/components/Utilities/SelectCalendar'
import Home from './src/components/Home'
import Movie from './src/app'

AppRegistry.registerComponent(appName, () =>  Wo);
