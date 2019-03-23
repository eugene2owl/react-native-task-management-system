import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { List, Text } from 'react-native-paper';
import { Color } from "../../assets/color";
import { TeamListItem } from "../../lib/models/team/team-list";
import { teamService } from "../../lib/network/http-services/team/team-service";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/headers/snack-notification/SnackNotification";
import { ErrorAbleResponse } from "../../lib/models/common/error-able-response";

interface State {
  teams: TeamListItem[];
  snackBarMessage: string;
}

export class TeamListScreen extends Component {

  state: State = {
    teams: [],
    snackBarMessage: ''
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  constructor(props: any) { // TODO move from constructor to needed method to reload each time user opens screen
    // TODO OR!!!!!!!!!!!!!!!! Add reload feature
    super(props); // TODO dehardcode project id
    teamService.getAll(10)
      .then((response: TeamListItem[] | ErrorAbleResponse) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error));
  }

  private processResponse(response: TeamListItem[] | ErrorAbleResponse): void {
    this.setState({ teams: response });

    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
    }
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  private navigateToDetails(): void {
    this.navigation.navigate(UsersStack.USER_DETAILS);
  }

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <ScreenHeader text="Team List"/>
        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />

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
                        style={ styles.listItemStyle }
                        left={ props =>
                          <List.Icon { ...props } icon="star" color={ member.isTeamLeader ? Color.LIGHT : Color.ENSIGN }/>
                        }
                        right={ () => (
                          <View style={ styles.listItemRightStyle }>
                            <Text>{ member.role }</Text>
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
      </View>
    )
  }
}
