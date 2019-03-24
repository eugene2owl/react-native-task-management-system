import styles from './styles';
import { View } from "react-native";
import { Icon } from "react-native-elements";
import * as React from "react";
import { Avatar } from "react-native-paper";

interface Props {
  name: string;
}

function extractAvatarLabel(username: string): string {
  const words = username.split(' ');
  return words.map(word => word.charAt(0).toUpperCase()).join('').substring(0, 3);
}

const ListAvatar = (props: Props) => {
  const { name } = props;

  return (
    <View style={ styles.container }>
      <Avatar.Text size={ 37 } label={ extractAvatarLabel(name) }/>
    </View>
  )
};

export { ListAvatar }
