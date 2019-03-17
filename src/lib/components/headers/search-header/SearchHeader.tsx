import styles from './styles';
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Color } from "../../../../assets/color";
import SearchBarWrapper from "./search-bar-wrapper/SearchBarWrapper";

export interface SearchHeaderSearchIcon {
  onPress: (text: string) => void;
}

export interface SearchHeaderCloseIcon {
  onPress: () => void;
}

interface Props {
  searchIcon: SearchHeaderSearchIcon;
  closeIcon: SearchHeaderCloseIcon;
}

const SearchHeader = (props: Props) => {
  const { searchIcon, closeIcon } = props;

  return (
    <View style={ styles.container }>

      <View style={ styles.searchBarContainer }>
        <SearchBarWrapper onIconPress={ (query: string) => searchIcon.onPress(query) }/>
      </View>

      <TouchableOpacity
        style={ styles.closeIconOpacity }
        onPress={ closeIcon.onPress }
      >
        <Icon name="close" color={ Color.LIGHT } size={ 32 }/>
      </TouchableOpacity>

    </View>
  )
};

export { SearchHeader }
