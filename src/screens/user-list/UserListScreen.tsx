import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { FAB, List } from 'react-native-paper';
import { HttpError } from "../../lib/network/common/http-error";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { userService } from "../../lib/network/http-services/user-service";
import { UserListItem } from "../../lib/models/user/user";
import { InitialsBasedAvatar } from "../../lib/components/icons/initials-based-avatar/InitialsBasedAvatar";
import { UserListChips } from "./user-list-chips/UserListChips";

interface State {
  users: UserListItem[];
  snackBarMessage: string;
  refreshing: boolean;
  httpReqInProcess: boolean;
}

export class UserListScreen extends Component {

  state: State = {
    users: [],
    snackBarMessage: '',
    refreshing: false,
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.requestContent();
  }

  private requestContent(byRefresh?: boolean): void {
    this.setState(byRefresh ? { refreshing: true } : { httpReqInProcess: true });

    userService.getAll(10)
      .then((response: UserListItem[]) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false, refreshing: false }));
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
    const maxLength = (!user.tasksInProgress || !user.tasksToPerform) ? 50 : 16;
    if (user.username.length < maxLength) {
      return user.username;
    }
    return user.username.substring(0, maxLength - 2).concat('...');
  }

  private navigateToUserDetails = (id: number) => this.navigation.navigate(UsersStack.USER_DETAILS, { id: id });
  private navigateToCreateUser = () => this.navigation.navigate(UsersStack.CREATE_USER);

  render(): ReactNode {
    const sideNavIcon = { name: 'first-page', onPress: () => this.navigation.openDrawer() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="User List" rightIcon={ sideNavIcon }/>

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={ styles.scrollContainerContent }
          refreshControl={
            <RefreshControl
              refreshing={ this.state.refreshing }
              onRefresh={ () => this.requestContent(true) }
            />
          }
        >
          <View style={ styles.contentContainer }>
            <List.Section>
              { this.state.users.map(user => (
                  <List.Item
                    title={ this.extractUsernameLabel(user) }
                    style={ styles.listItem }
                    left={ () => <InitialsBasedAvatar name={ user.username }/> }
                    right={ () =>
                      <UserListChips tasksToPerform={ user.tasksToPerform } tasksInProgress={ user.tasksInProgress }/> }
                    onPress={ () => this.navigateToUserDetails(user.id) }
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
