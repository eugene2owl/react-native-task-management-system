import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, View } from "react-native";
import { TasksStack, UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";

export class TaskDetailsScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToTimeLog(): void {
    this.navigation.navigate(TasksStack.TASK_TIME_LOG);
  }

  private navigateToUserDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Task Details" leftIcon={ goBackIcon }/>

        <Button
          title="Navigate to Task Time Log Screen"
          onPress={ () => this.navigateToTimeLog() }
        />
        <Button
          title="Navigate to User Details Screen"
          onPress={ () => this.navigateToUserDetails() }
        />
      </View>
    );
  }
}
