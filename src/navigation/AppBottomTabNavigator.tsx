// @ts-ignore
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
// @ts-ignore
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import * as React from "react";
import { AppTab } from "./routes";
import { NavigationIcon } from "../lib/components/icons/NavigationIcon";
import { Color } from "../assets/color";
import { TaskStatusFlow } from "../screens/task-status-flow/TaskStatusFlow";
import TaskStackNavigator from './TasksStackNavigator';
import UsersDrawerNavigator from './UsersDrawerNavigator';

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
    screen: TaskStatusFlow,
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
};

const navigatorConfig = {
  shifting: true,
  labeled: true,
  activeColor: Color.OCEAN,
  inactiveColor: Color.LIGHT,
  barStyle: { backgroundColor: Color.CARBON },
  initialRouteName: AppTab.TASKS, // TODO think of profile tab and first place for it
  backBehavior: 'none'
};

const materialBottomTabNavigator = createMaterialBottomTabNavigator(routeConfigs, navigatorConfig);

export default createAppContainer(materialBottomTabNavigator)
