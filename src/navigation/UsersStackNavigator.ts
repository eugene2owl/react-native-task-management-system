// @ts-ignore
import { createAppContainer, createStackNavigator } from "react-navigation";
import { UsersStack } from "./routes";
import { UserListScreen } from "../screens/user-list/UserListScreen";
import { UserDetailsScreen } from "../screens/user-details/UserDetailsScreen";

const routerConfigs = {
  [UsersStack.USER_LIST]: UserListScreen,
  [UsersStack.USER_DETAILS]: UserDetailsScreen
};

const navigatorConfig = {
  initialRouteName: UsersStack.USER_LIST,
  headerMode: 'none'
};

const UsersStackNavigator = createStackNavigator(routerConfigs, navigatorConfig);

export default createAppContainer(UsersStackNavigator);
