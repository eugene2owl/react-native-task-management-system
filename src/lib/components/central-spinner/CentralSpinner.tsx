import styles from './styles';
import { View } from "react-native";
import * as React from "react";
import { Color } from "../../../assets/color";
import { ActivityIndicator, Text } from "react-native-paper";

interface Props {
  animating: boolean;
}

const CentralSpinner = (props: Props) => {
  const { animating } = props;

  return (
    <View style={ [styles.container, animating ? styles.fullScreen : null] }>
      <ActivityIndicator
        animating={ animating }
        color={ Color.OCEAN }
        size="large"
        style={ styles.activityIndicator }
      />
      { animating &&
      <View style={ styles.messageContainer }>
        <Text style={ styles.messageText }>Request is being processed.</Text>
        <Text style={ styles.messageText }>Please wait.</Text>
      </View>
      }
    </View>
  )
};

export { CentralSpinner }
