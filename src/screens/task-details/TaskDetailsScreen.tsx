import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Color } from "../../assets/color";
import { TaskStack } from "../../navigation/routes";

interface TaskDetailsScreenProps {

}

export class TaskDetailsScreen extends Component<TaskDetailsScreenProps> { // TODO add state and props separately

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToTimeLog(): void {
    this.navigation.navigate(TaskStack.TASK_TIME_LOG);
  }

  render(): ReactNode {
    const { container, text } = styles;

    return (
      <View style={ container }>
        <Text style={ text }>Task Edit Screen</Text>
        <Button
          title="Navigate to Task Time Log Screen"
          onPress={ () => this.navigateToTimeLog() }/>
        <Button title="Back" onPress={ () => this.navigation.goBack() }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({ // TODO move to separate file
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.ENSIGN
  },
  text: {
    fontSize: 15,
    paddingVertical: 5
  }
});
