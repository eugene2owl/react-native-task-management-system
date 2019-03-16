import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import * as React from "react";

interface TabBarIconProps {
  name: string;
  focused: boolean;
  tintColor: string;
}

const TabBarIcon = (props: TabBarIconProps) => {
  const { container } = styles;

  return (
    <View style={ container }>
      <Icon name={ props.name } color={ props.tintColor } size={ props.focused ? 30 : 24 }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 30
  }
});

export { TabBarIcon }
