import styles from './styles';
import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Color } from "../../../../assets/color";

export interface ScreenHeaderIcon {
  name: string;
  color?: string;
  onPress: () => void;
}

interface ScreenHeaderProps {
  text: string;
  leftIcon?: ScreenHeaderIcon;
  rightIcon?: ScreenHeaderIcon;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
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

      <Text style={ styles.text } numberOfLines={ 1 } ellipsizeMode='tail'>
        { text }
      </Text>

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
