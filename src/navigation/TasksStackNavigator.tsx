// @ts-ignore
import { createAppContainer, createStackNavigator } from "react-navigation";
import { TaskStack } from "./routes";
import { TaskListScreen } from "../screens/task-list/TaskListScreen";
import { TaskDetailsScreen } from "../screens/task-details/TaskDetailsScreen";
import { TaskTimeLogScreen } from "../screens/task-time-log/TaskTimeLogScreen";

const routerConfigs = {
  [TaskStack.TASK_LIST]: TaskListScreen,
  [TaskStack.TASK_DETAILS]: TaskDetailsScreen,
  [TaskStack.TASK_TIME_LOG]: TaskTimeLogScreen
};

const navigatorConfig = {
  initialRouteName: TaskStack.TASK_LIST,
  headerMode: 'none'
};

const TasksStackNavigator = createStackNavigator(routerConfigs, navigatorConfig);

export default createAppContainer(TasksStackNavigator);
