import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Color } from "../../assets/color";

export class UserListScreen extends Component { // TODO add props

  // @ts-ignore
  private navigation = this.props.navigation;

  render(): ReactNode {
    const { container } = styles;

    return (
      <View style={ container }>
        <Text>User List Screen</Text>
        <Button
          title="Navigate To User Edit Screen"
          onPress={() => {}}/>
        <Button title="Back" onPress={() => this.navigation.openDrawer()}/>
      </View>
    )
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
