import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Color } from "../../assets/color";

export class TaskTimeLogScreen extends Component { // TODO add state and props separately

  // @ts-ignore
  private navigation = this.props.navigation;

  render(): ReactNode {
    const { container, text } = styles;

    return (
      <View style={ container }>
        <Text style={ text }>Task Edit Screen</Text>
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
    backgroundColor: Color.CARBON
  },
  text: {
    fontSize: 15,
    paddingVertical: 5
  }
});
