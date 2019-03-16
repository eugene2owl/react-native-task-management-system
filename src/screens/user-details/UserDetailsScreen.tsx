import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, Text, View } from "react-native";

export class UserDetailsScreen extends Component { // TODO add props

  // @ts-ignore
  private navigation = this.props.navigation;

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <Text>User Details Screen</Text>
        <Button title="Back" onPress={() => this.navigation.goBack()}/>
      </View>
    )
  }
}
