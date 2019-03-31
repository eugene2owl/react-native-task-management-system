// @ts-ignore
import { createAppContainer, createStackNavigator } from "react-navigation";
import { TasksStack, UsersStack } from "./routes";
import { TaskListScreen } from "../screens/task-list/TaskListScreen";
import { TaskDetailsScreen } from "../screens/task-details/TaskDetailsScreen";
import { TaskTimeLogScreen } from "../screens/task-time-log/TaskTimeLogScreen";
import { UserDetailsScreen } from "../screens/user-details/UserDetailsScreen";
import { CreateTaskScreen } from "../screens/create-task/CreateTaskScreen";

const routerConfigs = {
  [TasksStack.TASK_LIST]: TaskListScreen,
  [TasksStack.TASK_DETAILS]: TaskDetailsScreen,
  [TasksStack.CREATE_TASK]: CreateTaskScreen,
  [TasksStack.TASK_TIME_LOG]: TaskTimeLogScreen,
  [UsersStack.USER_DETAILS]: UserDetailsScreen,
};

const navigatorConfig = {
  initialRouteName: TasksStack.TASK_LIST,
  headerMode: 'none'
};

const TasksStackNavigator = createStackNavigator(routerConfigs, navigatorConfig);

export default createAppContainer(TasksStackNavigator);
