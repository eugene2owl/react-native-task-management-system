import styles from './styles';
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Color } from "../../../../assets/color";

export interface ScreenHeaderIcon {
  name: string;
  color?: string;
  onPress: () => void;
}

interface Props {
  text: string;
  leftIcon?: ScreenHeaderIcon | null;
  rightIcon?: ScreenHeaderIcon | null;
}

const ScreenHeader = (props: Props) => {
  const { text, leftIcon, rightIcon } = props;

  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.leftIconOpacity }
        disabled={ !leftIcon }
        onPress={ leftIcon ? leftIcon.onPress : () => null }
      >
        { leftIcon &&
        <Icon
          name={ leftIcon.name }
          color={ leftIcon.color || Color.LIGHT }
          size={ 32 }
        />
        }
      </TouchableOpacity>

      <View style={ styles.textContainer }>
        <Text style={ styles.text } numberOfLines={ 1 } ellipsizeMode="tail">
          { text }
        </Text>
      </View>

      <TouchableOpacity
        style={ styles.rightIconOpacity }
        disabled={ !rightIcon }
        onPress={ rightIcon ? rightIcon.onPress : () => null }
      >
        { rightIcon &&
        <Icon
          name={ rightIcon.name }
          color={ rightIcon.color || Color.LIGHT }
          size={ 32 }
        />
        }
      </TouchableOpacity>
    </View>
  )
};

export { ScreenHeader }
