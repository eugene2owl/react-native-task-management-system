import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { TeamCreateRequest, TeamCreateResponse } from "../../lib/models/team/team-create";
import { teamService } from "../../lib/network/http-services/team/team-service";

interface State {
  nameControlValue: string;
  leaderControlValue: number;
  membersControlValue: number[];
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class AddTeamScreen extends Component {

  state: State = {
    nameControlValue: '',
    leaderControlValue: 0,
    membersControlValue: [],
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  private get anyRequiredFormFieldAbsent(): boolean {
    return !this.state.nameControlValue || !this.state.leaderControlValue;
  }

  private get formData(): TeamCreateRequest {
    return {
      projectId: 10, // TODO dehardcode project id
      name: this.state.nameControlValue,
      leader: this.state.leaderControlValue,
      members: this.state.membersControlValue
    };
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });

    teamService.add(this.formData)
      .then((response: TeamCreateResponse) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processResponse(response: TeamCreateResponse): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    // TODO do smth with response
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Create Team" leftIcon={ goBackIcon }/>



        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    );
  }
}
