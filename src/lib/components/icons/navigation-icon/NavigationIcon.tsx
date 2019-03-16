import styles from './styles';
import { View } from "react-native";
import { Icon } from "react-native-elements";
import * as React from "react";

interface NavigationIconProps {
  name: string;
  distent: boolean;
  tintColor: string;
}

const NavigationIcon = (props: NavigationIconProps) => {
  return (
    <View style={ styles.container }>
      <Icon name={ props.name } color={ props.tintColor } size={ props.distent ? 30 : 24 }/>
    </View>
  )
};

export { NavigationIcon }
