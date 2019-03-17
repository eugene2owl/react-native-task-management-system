import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Color } from "../../assets/color";
import { ActivityIndicator } from "react-native-paper";
import { AppAuthSwitch } from "../../navigation/routes";
import { AsyncStorageKey } from "../../consts/AsyncStorageKey";

export class AuthLoadingScreen extends Component {

  // @ts-ignore
  private navigation = this.props.navigation;

  constructor(props: any) {
    super(props);
    this.loadData();
  }

  private loadData = async () => {
    const jwtToken = await AsyncStorage.getItem(AsyncStorageKey.JWT_TOKEN);
    this.navigation.navigate(jwtToken ? AppAuthSwitch.APP : AppAuthSwitch.LOGIN);
  };

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <ActivityIndicator animating={ true } color={ Color.OCEAN } size="large"/>
      </View>
    );
  }
}

