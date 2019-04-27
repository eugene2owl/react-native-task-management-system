// @ts-ignore
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppAuthSwitch } from "./routes";
import { AuthLoadingScreen } from "../screens/auth-loading/AuthLoadingScreen";
import AppBottomTabNavigator from './AppBottomTabNavigator';
import { LoginScreen } from "../screens/login/LoginScreen";

const routeConfigs = {
  [AppAuthSwitch.AUTH_LOADING]: AuthLoadingScreen,
  [AppAuthSwitch.APP]: AppBottomTabNavigator,
  [AppAuthSwitch.LOGIN]: LoginScreen
};

const navigatorConfig = {
  initialRouteName: AppAuthSwitch.AUTH_LOADING
};

console.disableYellowBox = true;
const appAuthSwitchNavigator = createSwitchNavigator(routeConfigs, navigatorConfig);

export default createAppContainer(appAuthSwitchNavigator)
