import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, Text, View } from "react-native";
import { UsersStack } from "../../navigation/routes";

export class TaskTimeLogScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToUserDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Task Edit Screen</Text>
        <Button
          title="Navigate to User Details Screen"
          onPress={ () => this.navigateToUserDetails() }
        />
        <Button title="Back" onPress={ () => this.navigation.goBack() }/>
      </View>
    );
  }
}
