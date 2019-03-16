import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import * as React from "react";

interface NavigationIconProps {
  name: string;
  distent: boolean;
  tintColor: string;
}

const NavigationIcon = (props: NavigationIconProps) => {
  const { container } = styles;

  return (
    <View style={ container }>
      <Icon name={ props.name } color={ props.tintColor } size={ props.distent ? 30 : 24 }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 30
  }
});

export { NavigationIcon }
