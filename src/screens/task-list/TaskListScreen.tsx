import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, Text, View } from "react-native";
import { TasksStack } from "../../navigation/routes";

interface TaskListScreenProps {

}

export class TaskListScreen extends Component<TaskListScreenProps> { // TODO add state and props separately

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToDetails(): void {
    this.navigation.navigate(TasksStack.TASK_DETAILS);
  }

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Task List Screen</Text>
        <Button
          title="Navigate to Task Details Screen"
          onPress={ () => this.navigateToDetails() }
        />
      </View>
    );
  }
}
