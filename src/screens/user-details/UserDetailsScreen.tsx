import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { Color } from "../../assets/color";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorageKey } from "../../consts/AsyncStorageKey";

export class UserDetailsScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  private onLogoutPress() {
    AsyncStorage.removeItem(AsyncStorageKey.JWT_TOKEN);
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="User Details" leftIcon={ goBackIcon }/>

        <Button
          mode="contained"
          dark={ true }
          color={ Color.OCEAN }
          onPress={ () => this.onLogoutPress() }
        >
          Log out
        </Button>
      </View>
    )
  }
}
