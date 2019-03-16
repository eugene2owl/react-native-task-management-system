// @ts-ignore
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { UsersDrawer } from "./routes";
import { NavigationIcon } from "../lib/components/icons/navigation-icon/NavigationIcon";
import * as React from "react";
import { Color } from "../assets/color";
import UsersStackNavigator from "./UsersStackNavigator";
import TeamsStackNavigator from "./TeamsStackNavigator";

const routerConfig = {
  [UsersDrawer.USER_LIST]: {
    screen: UsersStackNavigator,
    navigationOptions: {
      drawerLabel: 'Users',
      // @ts-ignore
      drawerIcon: ({ tintColor }) => (
        <NavigationIcon name="person-outline" distent={ false } tintColor={ tintColor }/>
      )
    }
  },
  [UsersDrawer.TEAM_LIST]: {
    screen: TeamsStackNavigator,
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
