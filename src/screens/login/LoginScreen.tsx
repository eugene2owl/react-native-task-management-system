import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Image, ScrollView, View } from "react-native";
import { AppAuthSwitch } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { Button, TextInput } from 'react-native-paper';
import { Color } from "../../assets/color";
import { authService } from "../../lib/network/http-services/auth-service";
import { Login, LoginResponse } from "../../lib/models/auth/login";
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKey } from "../../consts/AsyncStorageKey";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";

interface State {
  usernameControlValue: string;
  passwordControlValue: string;
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class LoginScreen extends Component {

  state: State = {
    usernameControlValue: '',
    passwordControlValue: '',
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;
  private iconLogoSource = require('../../assets/images/react_dark_icon/icons8-react-native-filled-200.png');

  private navigateToApp(): void {
    this.navigation.navigate(AppAuthSwitch.APP);
  }

  private get anyRequiredFormFieldAbsent(): boolean {
    return !this.state.usernameControlValue || !this.state.passwordControlValue;
  }

  private get formData(): Login {
    return {
      username: this.state.usernameControlValue,
      password: this.state.passwordControlValue
    };
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });

    authService.login(this.formData)
      .then((response: LoginResponse) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error));
  }

  private processResponse(response: LoginResponse): void {
    this.setState({ httpReqInProcess: false });

    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    AsyncStorage.setItem(AsyncStorageKey.JWT_TOKEN, response.token);
    this.navigateToApp();
  }

  private processError(error: HttpError): void {
    this.setState({ httpReqInProcess: false });
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  render(): ReactNode {

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Login"/>

        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={ styles.scrollContainerContent }
          keyboardShouldPersistTaps="always"
        >

          <View style={ styles.contentContainer }>
            <View style={ styles.formContainer }>
              <View style={ styles.logoContainer }>
                <Image source={ this.iconLogoSource }/>
              </View>

              <TextInput
                style={ styles.usernameControl }
                mode="outlined"
                label="Username"
                value={ this.state.usernameControlValue }
                onChangeText={ text => this.setState({ usernameControlValue: text }) }
              />

              <TextInput
                style={ styles.passwordControl }
                mode="outlined"
                label="Password"
                value={ this.state.passwordControlValue }
                secureTextEntry={ true }
                onChangeText={ text => this.setState({ passwordControlValue: text }) }
              />
            </View>

            <Button
              style={ styles.submitButton }
              mode="contained"
              dark={ true }
              color={ Color.OCEAN }
              disabled={ this.anyRequiredFormFieldAbsent || this.state.httpReqInProcess }
              loading={ this.state.httpReqInProcess }
              onPress={ () => this.sendFormData() }
            >
              Log in
            </Button>

          </View>
        </ScrollView>

        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    );
  }
}
