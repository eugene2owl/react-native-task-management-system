import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Color } from "../../assets/color";

export class TaskListScreen extends Component { // TODO add state and props separately

  render(): ReactNode {
    const { container, text, button } = styles;

    return (
      <View style={ container }>
        <Text style={ text }>Task List Screen</Text>
        <Button style={ button } title="Navigate to Task Edit Screen" onPress={() => {}}/>
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
  },
  button: {
    height: 15,
    marginVertical: 10
  }
});