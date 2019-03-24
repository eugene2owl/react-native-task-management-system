import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { FAB, List } from 'react-native-paper';
import { HttpError } from "../../lib/network/common/http-error";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { userService } from "../../lib/network/http-services/user/user-service";
import { UserListItem } from "../../lib/models/user/user";
import { ListAvatar } from "../../lib/components/icons/list-avatar/ListAvatar";
import { UserListChips } from "./user-list-chips/UserListChips";

interface State {
  users: UserListItem[];
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class UserListScreen extends Component { // TODO pull refresh feature

  state: State = {
    users: [],
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.requestContent();
  }

  private requestContent(): void {
    this.setState({ httpReqInProcess: true });

    userService.getAll(10) // TODO dehardcode project id
      .then((response: UserListItem[]) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processResponse(response: UserListItem[]): void {
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ users: response });
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

  private extractUsernameLabel(user: UserListItem): string {
    const maxLength = (!user.tasksInProgress || !user.tasksToPerform) ? 50 : 13;
    if (user.username.length < maxLength) {
      return user.username;
    }
    return user.username.substring(0, maxLength - 2).concat('...');
  }

  private navigateToUserDetails = () => this.navigation.navigate(UsersStack.USER_DETAILS); // TODO user or remove
  private navigateToCreateUser = () => this.navigation.navigate(UsersStack.CREATE_USER);

  render(): ReactNode {
    return (
      <View style={ styles.container }>
        <ScreenHeader text="User List"/>

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <ScrollView style={ styles.scrollContainer } contentContainerStyle={ styles.scrollContainerContent }>
          <View style={ styles.contentContainer }>
            <List.Section>
              { this.state.users.map(user => (
                  <List.Item
                    title={ this.extractUsernameLabel(user) }
                    style={ styles.listItem }
                    left={ () => <ListAvatar name={ user.username }/> }
                    right={ () =>
                      <UserListChips tasksToPerform={ user.tasksToPerform } tasksInProgress={ user.tasksInProgress }/> }
                    key={ user.id }
                  />
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
          onPress={ () => this.navigateToCreateUser() }
        />

        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    )
  }
}
