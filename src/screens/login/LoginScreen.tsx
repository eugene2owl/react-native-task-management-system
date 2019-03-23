import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Image, ScrollView, View } from "react-native";
import { AppAuthSwitch } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { Button, TextInput, Text } from 'react-native-paper';
import { Color } from "../../assets/color";
import { authService } from "../../lib/network/http-services/auth/auth-service";
import { LoginRequest, LoginResponse } from "../../lib/models/auth/login-request";
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKey } from "../../consts/AsyncStorageKey";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/headers/snack-notification/SnackNotification";

interface State {
  usernameControlValue: string;
  passwordControlValue: string;
  snackBarMessage: string;
  loginRequestProcessing: boolean;
}

export class LoginScreen extends Component {

  state: State = {
    usernameControlValue: '',
    passwordControlValue: '',
    snackBarMessage: '',
    loginRequestProcessing: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;
  private iconLogoSource = require('../../assets/images/react_dark_icon/icons8-react-native-filled-200.png');

  private navigateToApp(): void {
    this.navigation.navigate(AppAuthSwitch.APP);
  }

  private get anyRequiredCredAbsent(): boolean {
    return !this.state.usernameControlValue || !this.state.passwordControlValue;
  }

  private get enteredCredentials(): LoginRequest {
    return {
      username: this.state.usernameControlValue,
      password: this.state.passwordControlValue
    };
  }

  private sendCredentials(): void {
    this.setState({ loginRequestProcessing: true });

    authService.login(this.enteredCredentials)
      .then((response: LoginResponse) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error));
  }

  private processResponse(response: LoginResponse): void {
    this.setState({ loginRequestProcessing: false });
    if (response.error) {
      this.showOnStackBar(response.error.message);
    } else {
      AsyncStorage.setItem(AsyncStorageKey.JWT_TOKEN, response.token);
      this.navigateToApp();
    }
  }

  private processError(error: HttpError): void {
    this.setState({ loginRequestProcessing: false });
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  render(): ReactNode {

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Login"/>
        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
        <ScrollView style={ styles.scrollContainer } contentContainerStyle={ styles.scrollContainerContent }>

          <View style={ styles.contentContainer }>
            <View style={ styles.formContainer }>
              <View style={ styles.logoContainer }>
                <Image source={ this.iconLogoSource }/>
              </View>

              <TextInput
                style={ styles.usernameControl }
                mode="outlined"
                label='Username'
                value={ this.state.usernameControlValue }
                onChangeText={ text => this.setState({ usernameControlValue: text }) }
              />

              <TextInput
                style={ styles.passwordControl }
                mode="outlined"
                label='Password'
                value={ this.state.passwordControlValue }
                onChangeText={ text => this.setState({ passwordControlValue: text }) }
              />
            </View>

            <Button
              style={ styles.submitButton }
              mode="contained"
              dark={ true }
              color={ Color.OCEAN }
              disabled={ this.anyRequiredCredAbsent || this.state.loginRequestProcessing }
              loading={ this.state.loginRequestProcessing }
              onPress={ () => this.sendCredentials() }
            >
              Log in
            </Button>

          </View>
        </ScrollView>
      </View>
    );
  }
}
