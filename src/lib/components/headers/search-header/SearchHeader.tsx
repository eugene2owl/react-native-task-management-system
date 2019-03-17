import styles from './styles';
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Icon } from "react-native-elements";
import { Color } from "../../../../assets/color";

export interface SearchHeaderSearchIcon {
  onPress: (text: string) => void;
}

export interface SearchHeaderCloseIcon {
  onPress: () => void;
}

interface Props {
  text: string;
  searchIcon: SearchHeaderSearchIcon;
  closeIcon: SearchHeaderCloseIcon;
}

const SearchHeader = (props: Props) => {
  const { searchIcon, closeIcon } = props;
  let { text } = props;

  return (
    <View style={ styles.container }>

      <View style={ styles.searchBarContainer }>
        <Searchbar
          placeholder="Search"
          onChangeText={ query => text = query }
          onIconPress={ () => searchIcon.onPress(text) }
          style={ styles.searchBar }
          value={ text }
        />
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
