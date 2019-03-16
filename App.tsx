import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Tab } from "./src/consts/routes";
import { TaskListScreen } from "./src/screens/task-list/TaskListScreen";
import { TeamListScreen } from "./src/screens/team-list/TeamListScreen";
import { Color } from "./src/assets/color";
import * as React from "react";
import { TabBarIcon } from "./src/lib/components/icons/TabBarIcon";

const routeConfigs = {
  [Tab.TASKS]: {
    screen: TaskListScreen,
    navigationOptions: {
      title: 'Tasks',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarIcon name="playlist-add-check" focused={ focused } tintColor={ tintColor }/>
      )
    }
  },
  [Tab.USERS]: {
    screen: TeamListScreen,
    navigationOptions: {
      title: 'Users',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarIcon name="group" focused={ focused } tintColor={ tintColor }/>
      )
    }
  },
  [Tab.TASK_STATUS_FLOW]: {
    screen: TeamListScreen,
    navigationOptions: {
      title: 'Status Flow',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarIcon name="linear-scale" focused={ focused } tintColor={ tintColor }/>
      )
    }
  } // TODO add profile screen
};

const materialBottomTabNavigatorConfig = {
  shifting: true,
  labeled: true,
  activeColor: Color.OCEAN,
  inactiveColor: Color.LIGHT,
  barStyle: { backgroundColor: Color.CARBON },
  initialRouteName: Tab.TASKS, // TODO think of profile tab and first place for it
  backBehavior: 'none'
};

const materialBottomTabNavigator = createMaterialBottomTabNavigator(
  routeConfigs, materialBottomTabNavigatorConfig
);

export default createAppContainer(materialBottomTabNavigator)
