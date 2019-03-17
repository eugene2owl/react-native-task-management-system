import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";

export class UserDetailsScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="User Details" leftIcon={ goBackIcon }/>
      </View>
    )
  }
}
