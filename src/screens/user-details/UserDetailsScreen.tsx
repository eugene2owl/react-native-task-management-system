import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { Chip, Text } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorageKey } from "../../consts/AsyncStorageKey";
import { UserDetails } from "../../lib/models/user/user";
import { userService } from "../../lib/network/http-services/user-service";
import { HttpError } from "../../lib/network/common/http-error";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { InitialsBasedAvatar } from "../../lib/components/icons/initials-based-avatar/InitialsBasedAvatar";
import { appPaperTheme } from "../../assets/paper-theme";
import { Color } from "../../assets/color";
import { AppAuthSwitch } from "../../navigation/routes";

const defaultUserDetails: UserDetails = {
  id: 0,
  username: '',
  teams: [],
  role: '',
  timeLogged: '',
  error: { message: '', status: 200 }
};

interface State {
  id: number,
  userDetails: UserDetails;
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class UserDetailsScreen extends Component {

  state: State = {
    id: 0,
    userDetails: defaultUserDetails,
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.state.id = this.navigation.state.params ? this.navigation.state.params.id : 0;
    this.requestContent();
  }

  private requestContent(): void {
    this.setState({ httpReqInProcess: true });

    userService.getDetails(this.state.id || 10)
      .then((response: UserDetails) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processResponse(response: UserDetails): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ userDetails: response });
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  private onLogoutPress() {
    AsyncStorage.removeItem(AsyncStorageKey.JWT_TOKEN);
    this.navigation.navigate(AppAuthSwitch.AUTH_LOADING);
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };
    const logOutIcon = { name: 'exit-to-app', onPress: () => this.onLogoutPress() };
    const chipTheme = JSON.parse(JSON.stringify(appPaperTheme));
    chipTheme.colors.text = Color.FRANT;

    return (
      <View style={ styles.container }>
        <ScreenHeader
          text={ this.state.id ? 'User Details' : 'Profile' }
          leftIcon={ this.state.id ? goBackIcon : null }
          rightIcon={ !this.state.id ? logOutIcon : null }
        />

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <View style={ styles.detailsContainer }>

          <View style={ styles.baseDetailsZone }>
            <View style={ styles.avatarContainer }>
              <InitialsBasedAvatar name={ this.state.userDetails.username } size={ 130 }/>
            </View>

            <View style={ styles.descriptionContainer }>
              <Text style={ styles.usernameLabel }>{ this.state.userDetails.username }</Text>
              <Text style={ styles.roleLabel }>{ this.state.userDetails.role }</Text>
              <Text style={ styles.timeLoggedLabel }>{ this.state.userDetails.timeLogged }</Text>

              <View style={ styles.teamsContainer }>
                { this.state.userDetails.teams.map(team =>
                  <Chip style={ styles.teamChip } theme={ chipTheme } mode="outlined" key={ team }>
                    { team }
                  </Chip>
                )
                }
              </View>
            </View>
          </View>

        </View>

        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    )
  }
}
