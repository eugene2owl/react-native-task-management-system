// @ts-ignore
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { UsersDrawer } from "./routes";
import { UserListScreen } from "../screens/user-list/UserListScreen";
import { NavigationIcon } from "../lib/components/icons/NavigationIcon";
import * as React from "react";
import { TeamListScreen } from "../screens/team-list/TeamListScreen";
import { Color } from "../assets/color";

const routerConfig = {
  [UsersDrawer.USER_LIST]: {
    screen: UserListScreen,
    navigationOptions: {
      drawerLabel: 'Users',
      // @ts-ignore
      drawerIcon: ({ tintColor }) => (
        <NavigationIcon name="person-outline" distent={ false } tintColor={ tintColor }/>
      )
    }
  },
  [UsersDrawer.TEAM_LIST]: {
    screen: TeamListScreen,
    navigationOptions: {
      drawerLabel: 'Teams',
      // @ts-ignore
      drawerIcon: ({ tintColor }) => (
        <NavigationIcon name="people-outline" distent={ false } tintColor={ tintColor }/>
      )
    }
  }
};

const navigatorConfig = {
  drawerPosition: 'right',
  contentOptions: {
    activeTintColor: Color.OCEAN,
    inactiveTintColor: Color.LIGHT
  },
  drawerBackgroundColor: Color.CARBON,
  initialRouteName: UsersDrawer.USER_LIST,
  backBehavior: 'none'
};

const UsersDrawerNavigator = createDrawerNavigator(routerConfig, navigatorConfig);

export default createAppContainer(UsersDrawerNavigator);
