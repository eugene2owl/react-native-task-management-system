import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Alert, Button, Text, View } from "react-native";
import { TasksStack, UsersStack } from "../../navigation/routes";
import { ScreenHeader, ScreenHeaderIcon } from "../../lib/components/headers/screen-header/ScreenHeader";

interface TaskDetailsScreenProps {

}

export class TaskDetailsScreen extends Component<TaskDetailsScreenProps> { // TODO add state and props separately

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToTimeLog(): void {
    this.navigation.navigate(TasksStack.TASK_TIME_LOG);
  }

  private navigateToUserDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  private onLeftIconPress(): void { // TODO remove
    Alert.alert('left');
  }

  private onRightIconPress(): void { // TODO remove
    Alert.alert('right');
  }

  render(): ReactNode {
    const leftIcon: ScreenHeaderIcon = { name: 'search', onPress: this.onLeftIconPress };
    const rightIcon: ScreenHeaderIcon = { name: 'close', onPress: this.onRightIconPress };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Task Details" rightIcon={ rightIcon }/>

        <Button
          title="Navigate to Task Time Log Screen"
          onPress={ () => this.navigateToTimeLog() }
        />
        <Button
          title="Navigate to User Details Screen"
          onPress={ () => this.navigateToUserDetails() }
        />
        <Button title="Back" onPress={ () => this.navigation.goBack() }/>
      </View>
    );
  }
}
