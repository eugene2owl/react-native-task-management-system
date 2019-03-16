import * as React from "react";
import { Component, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "../../assets/color";

export class UserDetailsScreen extends Component { // TODO add props

  render(): ReactNode {
    const { container } = styles;

    return (
      <View style={ container }>
        <Text>User Edit Screen</Text>
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
