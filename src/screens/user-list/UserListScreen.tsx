import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";

export class UserListScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <ScreenHeader text="User List"/>

        <Button
          title="Navigate To User Details Screen"
          onPress={() => this.navigateToDetails()}
        />
      </View>
    )
  }
}
