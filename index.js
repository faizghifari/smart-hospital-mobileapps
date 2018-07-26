/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import camera from './src/components/Utilities/Camera'
import chart from './src/components/Charts/EngChart'
import mohAM from './src/components/Users/MOH/MohAM'
import eng from './src/components/Menu/Engineer'
import Tes from './Tes'
import menu from './src/components/Menu/MOH'
import Asset from './src/components/AssetDetail.js'
import Home from './src/components/Home'

AppRegistry.registerComponent(appName, () =>  Tes);
