// @ts-ignore
import { createAppContainer, createStackNavigator } from "react-navigation";
import { TeamsStack } from "./routes";
import { UserDetailsScreen } from "../screens/user-details/UserDetailsScreen";
import { TeamListScreen } from "../screens/team-list/TeamListScreen";

const routerConfigs = {
  [TeamsStack.TEAM_LIST]: TeamListScreen,
  [TeamsStack.USER_DETAILS]: UserDetailsScreen
};

const navigatorConfig = {
  initialRouteName: TeamsStack.TEAM_LIST,
  headerMode: 'none'
};

const TeamsStackNavigator = createStackNavigator(routerConfigs, navigatorConfig);

export default createAppContainer(TeamsStackNavigator);
