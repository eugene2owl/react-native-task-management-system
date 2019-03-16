import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Text, View } from "react-native";

export class TaskStatusFlow extends Component {

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <Text>Task Status Flow Screen</Text>
      </View>
    )
  }
}
