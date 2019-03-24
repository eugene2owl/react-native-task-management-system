// @ts-ignore
import { createAppContainer, createStackNavigator } from "react-navigation";
import { UsersStack } from "./routes";
import { UserListScreen } from "../screens/user-list/UserListScreen";
import { UserDetailsScreen } from "../screens/user-details/UserDetailsScreen";
import { CreateUserScreen } from "../screens/create-user/CreateUserScreen";

const routerConfigs = {
  [UsersStack.USER_LIST]: UserListScreen,
  [UsersStack.USER_DETAILS]: UserDetailsScreen,
  [UsersStack.CREATE_USER]: CreateUserScreen
};

const navigatorConfig = {
  initialRouteName: UsersStack.USER_LIST,
  headerMode: 'none'
};

const UsersStackNavigator = createStackNavigator(routerConfigs, navigatorConfig);

export default createAppContainer(UsersStackNavigator);
