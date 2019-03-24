import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { TeamsStack, UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { FAB, List, Text } from 'react-native-paper';
import { Color } from "../../assets/color";
import { TeamListItem } from "../../lib/models/team/team-list";
import { teamService } from "../../lib/network/http-services/team/team-service";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";

interface State {
  teams: TeamListItem[];
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class TeamListScreen extends Component {

  state: State = {
    teams: [],
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  constructor(props: any) { // TODO move from constructor to needed method to reload each time user opens screen
    // TODO OR!!!!!!!!!!!!!!!! Add reload feature
    super(props);
  }

  componentDidMount(): void {
    this.requestContent();
  }

  private requestContent(): void {
    this.setState({ httpReqInProcess: true });
    teamService.getAll(10) // TODO dehardcode project id
      .then((response: TeamListItem[]) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processResponse(response: TeamListItem[]): void {
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ teams: response });
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  private navigateToUserDetails = () => this.navigation.navigate(UsersStack.USER_DETAILS); // TODO user or remove
  private navigateToCreateTeam = () => this.navigation.navigate(TeamsStack.CREATE_TEAM);


  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <ScreenHeader text="Team List"/>

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <ScrollView style={ styles.scrollContainer } contentContainerStyle={ styles.scrollContainerContent }>
          <View style={ styles.contentContainer }>
            <List.Section>
              { this.state.teams.map(team => (
                  <List.Accordion
                    title={ team.name }
                    left={ props => <List.Icon { ...props } icon="people-outline"/> }
                    description={ team.timeLogged }
                    key={ team.id }
                  >
                    { team.members.map(member =>
                      <List.Item
                        title={ member.username }
                        style={ styles.listItem }
                        left={ props =>
                          <List.Icon { ...props } icon="star" color={ member.isTeamLeader ? Color.LIGHT : Color.ENSIGN }/>
                        }
                        right={ () => (
                          <View style={ styles.listItemRight }>
                            <Text style={ styles.listItemRightText }>{ member.role }</Text>
                          </View>
                        ) }
                        description={ member.timeLogged }
                        key={ member.id }
                      />
                    )
                    }
                  </List.Accordion>
                )
              )
              }
            </List.Section>
          </View>
        </ScrollView>

        <FAB
          style={ styles.fab }
          icon="add"
          disabled={ this.state.httpReqInProcess }
          onPress={ () => this.navigateToCreateTeam() }
        />

        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    )
  }
}
