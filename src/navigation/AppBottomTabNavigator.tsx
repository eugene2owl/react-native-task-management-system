// @ts-ignore
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
// @ts-ignore
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import * as React from "react";
import { AppTab } from "./routes";
import { NavigationIcon } from "../lib/components/icons/navigation-icon/NavigationIcon";
import { Color } from "../assets/color";
import { TaskStatusFlowScreen } from "../screens/task-status-flow/TaskStatusFlowScreen";
import TaskStackNavigator from './TasksStackNavigator';
import UsersDrawerNavigator from './UsersDrawerNavigator';
import { UserDetailsScreen } from "../screens/user-details/UserDetailsScreen";

const routeConfigs = {
  [AppTab.TASKS]: {
    screen: TaskStackNavigator,
    navigationOptions: {
      title: 'Tasks',
      // @ts-ignore
      tabBarIcon: ({ focused, tintColor }) => (
        <NavigationIcon name="playlist-add-check" distent={ focused } tintColor={ tintColor }/>
      )
    }
  },
  [AppTab.TASK_STATUS_FLOW]: {
    screen: TaskStatusFlowScreen,
    navigationOptions: {
      title: 'Status Flow',
      // @ts-ignore
      tabBarIcon: ({ focused, tintColor }) => (
        <NavigationIcon name="linear-scale" distent={ focused } tintColor={ tintColor }/>
      )
    }
  },
  [AppTab.USERS]: {
    screen: UsersDrawerNavigator,
    navigationOptions: {
      title: 'Users',
      // @ts-ignore
      tabBarIcon: ({ focused, tintColor }) => (
        <NavigationIcon name="group" distent={ focused } tintColor={ tintColor }/>
      )
    }
  },
  [AppTab.PROFILE]: {
    screen: UserDetailsScreen,
    navigationOptions: {
      title: 'Profile',
      // @ts-ignore
      tabBarIcon: ({ focused, tintColor }) => (
        <NavigationIcon name="home" distent={ focused } tintColor={ tintColor }/>
      )
    }
  }
};

const navigatorConfig = {
  shifting: true,
  labeled: true,
  activeColor: Color.OCEAN,
  inactiveColor: Color.LIGHT,
  barStyle: { backgroundColor: Color.CARBON },
  initialRouteName: AppTab.TASKS,
  backBehavior: 'none'
};

const materialBottomTabNavigator = createMaterialBottomTabNavigator(routeConfigs, navigatorConfig);

export default createAppContainer(materialBottomTabNavigator)
