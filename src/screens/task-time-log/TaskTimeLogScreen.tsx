import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";

export class TaskTimeLogScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToUserDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Task Time Log" leftIcon={ goBackIcon }/>
        <Button
          title="Navigate to User Details Screen"
          onPress={ () => this.navigateToUserDetails() }
        />
      </View>
    );
  }
}
