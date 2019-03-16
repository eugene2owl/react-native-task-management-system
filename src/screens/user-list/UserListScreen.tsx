import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, Text, View } from "react-native";
import { UsersStack } from "../../navigation/routes";

export class UserListScreen extends Component { // TODO add props

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <Text>User List Screen</Text>
        <Button
          title="Navigate To User Details Screen"
          onPress={() => this.navigateToDetails()}
        />
      </View>
    )
  }
}
