import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Color } from "../../assets/color";
import { UserCreateRequest, UserListItem, UserPreCreateData } from "../../lib/models/user/user";
import { InitialsBasedAvatar } from "../../lib/components/icons/initials-based-avatar/InitialsBasedAvatar";
import { Lookup } from "../../lib/models/common/Lookup";
import { userService } from "../../lib/network/http-services/user-service";
import { FormPickerControl } from "../../lib/components/form-controls/form-picker/FormPickerControl";
import { FormPickerItem } from "../../lib/components/form-controls/form-picker/utils/form-picker-item";

interface State {
  teams: Lookup[];
  roles: Lookup[];

  usernameControlValue: string;
  passwordControlValue: string;
  teamControlValue: number;
  roleControlValue: number;

  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class CreateUserScreen extends Component {

  state: State = {
    teams: [],
    roles: [],

    usernameControlValue: '',
    passwordControlValue: '',
    teamControlValue: 0,
    roleControlValue: 0,

    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.requestPreCreateData();
  }

  private requestPreCreateData(): void {
    this.setState({ httpReqInProcess: true });

    userService.getPreCreateData(10)
      .then((response: UserPreCreateData) => this.processPreCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processPreCreateResponse(response: UserPreCreateData): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ teams: response.teams, roles: response.roles });
  }

  private get anyRequiredFormFieldAbsent(): boolean {
    return !this.state.usernameControlValue
      || this.state.passwordControlValue.length < 6
      || !this.state.roleControlValue;
  }

  private get formData(): UserCreateRequest {
    return {
      projectId: 10,
      username: this.state.usernameControlValue,
      password: this.state.passwordControlValue,
      teamId: this.state.teamControlValue,
      roleId: this.state.roleControlValue
    };
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });

    userService.create(this.formData)
      .then((response: UserListItem) => this.processCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processCreateResponse(response: UserListItem): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.navigation.goBack();
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message });
  }

  private get teamPickerItems(): FormPickerItem[] {
    return this.state.teams.map(lookup => ({ label: lookup.name, value: lookup.id }));
  }

  private get rolePickerItems(): FormPickerItem[] {
    return this.state.roles.map(lookup => ({ label: lookup.name, value: lookup.id }));
  }

  private get tooEasyPassword(): boolean {
    return this.state.passwordControlValue.length > 0 && this.state.passwordControlValue.length < 6;
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Create User" leftIcon={ goBackIcon }/>

        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={ styles.scrollContainerContent }
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={ true }
        >

          <View style={ styles.contentContainer }>
            <View style={ styles.formContainer }>
              <View style={ styles.logoContainer }>
                <InitialsBasedAvatar name={ this.state.usernameControlValue } size={ 150 }/>
              </View>

              <TextInput
                style={ styles.usernameControl }
                mode="outlined"
                label="Username"
                value={ this.state.usernameControlValue }
                onChangeText={ text => this.setState({ usernameControlValue: text }) }
              />
              <HelperText visible={ this.state.usernameControlValue.length > 15 }>
                <Text style={ styles.hint }>Long username might look not pretty later</Text>
              </HelperText>

              <TextInput
                style={ styles.passwordControl }
                mode="outlined"
                label="Password"
                value={ this.state.passwordControlValue }
                onChangeText={ text => this.setState({ passwordControlValue: text }) }
              />
              <HelperText visible={ this.tooEasyPassword }>
                <Text style={ styles.errorHint }>Password is too easy</Text>
              </HelperText>

              <FormPickerControl
                items={ this.teamPickerItems }
                onValueChange={ (itemValue: number) => this.setState({ teamControlValue: itemValue }) }
                label="Team"
              />

              <FormPickerControl
                items={ this.rolePickerItems }
                onValueChange={ (itemValue: number) => this.setState({ roleControlValue: itemValue }) }
                label="Role"
              />
            </View>

            <Button
              style={ styles.submitButton }
              mode="contained"
              dark={ true }
              color={ Color.SUN }
              disabled={ this.anyRequiredFormFieldAbsent || this.state.httpReqInProcess }
              loading={ this.state.httpReqInProcess }
              onPress={ () => this.sendFormData() }
            >
              Create User
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
