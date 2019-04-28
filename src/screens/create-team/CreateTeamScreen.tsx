import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Image, ScrollView, View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { TeamCreateRequest, TeamCreateResponse } from "../../lib/models/team/team-create";
import { teamService } from "../../lib/network/http-services/team-service";
import { Button, Checkbox, List, RadioButton, TextInput } from "react-native-paper";
import { Color } from "../../assets/color";
import { UserCandidate } from "../../lib/models/user/user";
import { InitialsBasedAvatar } from "../../lib/components/icons/initials-based-avatar/InitialsBasedAvatar";

interface State {
  candidates: UserCandidate[];

  nameControlValue: string;
  leaderControlValue: number;
  membersControlValue: number[];

  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class CreateTeamScreen extends Component {

  state: State = {
    candidates: [],

    nameControlValue: '',
    leaderControlValue: 0,
    membersControlValue: [],

    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;
  private iconLogoSource = require('../../assets/images/react_cloud_icon/icons8-react-native-filled-150.png');

  componentDidMount(): void {
    this.requestPreCreateData();
  }

  private requestPreCreateData(): void {
    this.setState({ httpReqInProcess: true });

    teamService.getPreCreateData(10)
      .then((response: UserCandidate[]) => this.processPreCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processPreCreateResponse(response: UserCandidate[]): void {
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ candidates: response });
  }

  private get anyRequiredFormFieldAbsent(): boolean {
    return !this.state.nameControlValue || !this.state.leaderControlValue;
  }

  private get formData(): TeamCreateRequest {
    return {
      projectId: 10,
      name: this.state.nameControlValue,
      leader: this.state.leaderControlValue,
      members: this.state.membersControlValue
    };
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });

    teamService.create(this.formData)
      .then((response: TeamCreateResponse) => this.processCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processCreateResponse(response: TeamCreateResponse): void {
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
    this.setState({ snackBarMessage: message })
  }

  private leaderChecked(candidateId: number): boolean {

    const whetherLeader = this.state.leaderControlValue === candidateId;
    console.log(this.state.leaderControlValue, ' is leader currently ', whetherLeader);
    return whetherLeader;
  }

  private checkLeader(candidateId: number): void {
    console.log('check leader ', candidateId, ' instead of ', this.state.leaderControlValue);
    this.setState({ leaderControlValue: candidateId });
  }

  private memberChecked(candidateId: number): boolean {
    return this.state.membersControlValue.includes(candidateId);
  }

  private checkMember(candidateId: number): void {
    let members = this.state.membersControlValue;

    if (this.memberChecked(candidateId)) {
      members = members.filter(member => member !== candidateId);
    } else {
      members.push(candidateId);
    }

    this.setState({ membersControlValue: members });
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Create Team" leftIcon={ goBackIcon }/>

        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={ styles.scrollContainerContent }
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={ true }
        >

          <View style={ styles.contentContainer }>
            <View style={ styles.formContainer }>
              <View style={ styles.logoContainer }>
                <Image source={ this.iconLogoSource }/>
              </View>

              {/* Name */ }
              <TextInput
                style={ styles.nameControl }
                mode="outlined"
                label="Name"
                value={ this.state.nameControlValue }
                onChangeText={ text => this.setState({ nameControlValue: text }) }
              />

              {/* Team leader radio buttons */ }
              <List.Accordion
                style={ styles.candidatesControlList }
                title="Team Leader"
                left={ props => <List.Icon { ...props } icon="person-outline"/> }
                description="Select leader for your new team."
              >
                <ScrollView
                  style={ styles.candidatesControlListScroll }
                  contentContainerStyle={ styles.candidatesControlListScrollContent }
                  nestedScrollEnabled={ true }
                >
                  { this.state.candidates.map(candidate =>
                    <List.Item
                      title={ candidate.username }
                      style={ styles.candidatesControlListItem }
                      left={ () => <InitialsBasedAvatar name={ candidate.username }/> }
                      onPress={ () => this.checkLeader(candidate.id) }
                      right={ () =>
                        <View style={ styles.candidatesControlListItemRight }>
                          <RadioButton
                            value=""
                            status={ this.leaderChecked(candidate.id) ? 'checked' : 'unchecked' }
                            onPress={ () => this.checkLeader(candidate.id) }
                          />
                        </View>
                      }
                      key={ candidate.id }
                    />
                  )
                  }
                </ScrollView>
              </List.Accordion>

              {/* Members checkboxes */ }
              <List.Accordion
                style={ styles.candidatesControlList }
                title="Members"
                left={ props => <List.Icon { ...props } icon="people-outline"/> }
                description="Select members for your new team."
              >
                <ScrollView
                  style={ styles.candidatesControlListScroll }
                  contentContainerStyle={ styles.candidatesControlListScrollContent }
                  nestedScrollEnabled={ true }
                >
                  { this.state.candidates.map(candidate =>
                    <List.Item
                      title={ candidate.username }
                      style={ styles.candidatesControlListItem }
                      left={ () => <InitialsBasedAvatar name={ candidate.username }/> }
                      onPress={ () => this.checkMember(candidate.id) }
                      right={ () =>
                        <View style={ styles.candidatesControlListItemRight }>
                          <Checkbox
                            status={ this.memberChecked(candidate.id) ? 'checked' : 'unchecked' }
                          />
                        </View>
                      }
                      key={ candidate.id }
                    />
                  )
                  }
                </ScrollView>
              </List.Accordion>

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
              Create Team
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
