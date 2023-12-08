import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import {notifeeRegisterForegroundService} from "@/screens/ForegroundService/NotifeeForegroundService";

ReactNativeForegroundService.register();
notifeeRegisterForegroundService()
AppRegistry.registerComponent(appName, () => App);
