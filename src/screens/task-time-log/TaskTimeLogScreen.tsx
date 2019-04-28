import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { TaskTimelog, TaskTimelogRequest, TaskTimelogUser } from "../../lib/models/task/task-time-log";
import { taskService } from "../../lib/network/http-services/task-service";
import { HttpError } from "../../lib/network/common/http-error";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { Button, List, TextInput } from "react-native-paper";
import { Color } from "../../assets/color";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";

const DEFAULT_TIMELOG = {
  id: 0,
  name: '',
  total: { hours: 0, minutes: 0, seconds: 0 },
  users: [],
  error: { status: 0, message: '' }
};

interface State {
  id: number;
  taskTimelog: TaskTimelog;
  commentControlValue: string;
  hoursControlValue: number;
  minutesControlValue: number;
  searchOpened: boolean;
  snackBarMessage: string;
  refreshing: boolean;
  httpReqInProcess: boolean;
}

export class TaskTimeLogScreen extends Component {

  state: State = {
    id: 0,
    taskTimelog: DEFAULT_TIMELOG,
    commentControlValue: '',
    hoursControlValue: 0,
    minutesControlValue: 0,
    searchOpened: false,
    snackBarMessage: '',
    refreshing: false,
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.state.id = this.navigation.state.params.id;
    this.requestContent();
  }

  private requestContent(byRefresh?: boolean): void {
    this.setState(byRefresh ? { refreshing: true } : { httpReqInProcess: true });

    taskService.getTimelog(this.state.id)
      .then((response: TaskTimelog) => this.processGetResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false, refreshing: false }));
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });

    taskService.addTimelog(this.state.id, this.formData)
      .then((response: TaskTimelogRequest) => this.processPostResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processGetResponse(response: TaskTimelog): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ taskTimelog: response });
  }

  private processPostResponse(response: TaskTimelogRequest): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.showOnStackBar('Time successfully logged!');
    const newLog: TaskTimelogUser = {
      id: 0,
      username: 'You',
      timelogged: response.hoursLogged + 'h ' + response.minutesLogged + 'm',
      datecreated: 'just',
      timecreated: 'the moment'
    };
    this.state.taskTimelog.users.push(newLog);
    this.setState({ taskTimelog: this.state.taskTimelog });
  }

  private get formData(): TaskTimelogRequest {
    // @ts-ignore
    return {
      userId: 10,
      taskId: this.state.id,
      comment: this.state.commentControlValue,
      hoursLogged: this.state.hoursControlValue,
      minutesLogged: this.state.minutesControlValue,
    };
  }

  private processError = (error: HttpError) => this.showOnStackBar(error.message);

  private showOnStackBar = (message: string) => this.setState({ snackBarMessage: message });

  private get description(): string {
    if (!this.state.taskTimelog.total) {
      return '0 h 0m was logged on task ' + this.state.taskTimelog.name;
    }
    return (this.state.taskTimelog.total.hours || 0) + 'h '
      + (this.state.taskTimelog.total.minutes || 0) + 'm was logged on task '
      + this.state.taskTimelog.name
  }

  private navigateToUserDetails = (id: number): void => this.navigation.navigate(UsersStack.USER_DETAILS, { id: id });

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Task Time Log" leftIcon={ goBackIcon }/>

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <View style={ styles.logActionArea }>
          <TextInput
            style={ styles.commentControl }
            mode="outlined"
            label="Comment"
            value={ this.state.commentControlValue }
            onChangeText={ text => this.setState({ commentControlValue: text }) }
            multiline={ true }
          />

          <View style={ styles.hoursMinutesButtonArea }>
            <View style={ styles.hoursMinutesArea }>
              <TextInput
                style={ styles.hoursControl }
                mode="outlined"
                label="Hours"
                keyboardType='numeric'
                value={ '' + this.state.hoursControlValue }
                onChangeText={ text => this.setState({ hoursControlValue: parseInt(text) || 0 }) }
              />
              <TextInput
                style={ styles.minutesControl }
                mode="outlined"
                label="Minutes"
                keyboardType='numeric'
                value={ '' + this.state.minutesControlValue }
                onChangeText={ text => this.setState({ minutesControlValue: parseInt(text) || 0 }) }
              />
            </View>
            <Button
              style={ styles.submitButton }
              mode="contained"
              dark={ true }
              color={ Color.SUN }
              disabled={ (!this.state.hoursControlValue && !this.state.minutesControlValue) || this.state.httpReqInProcess }
              loading={ this.state.httpReqInProcess }
              onPress={ () => this.sendFormData() }
            >
              Log
            </Button>
          </View>
        </View>

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
              <List.Accordion
                title={ (this.state.taskTimelog.users.length || 0) + ' time logs found' }
                left={ props => <List.Icon { ...props } icon="list"/> }
                description={ this.description }
              >
                { this.state.taskTimelog.users.map((user: TaskTimelogUser) =>
                  <List.Item
                    title={ user.username }
                    style={ styles.listItem }
                    left={ props => <List.Icon { ...props } icon="receipt" color={ Color.LIGHT }/> }
                    right={ () => (
                      <View style={ styles.listItemRight }>
                        <Text style={ styles.listItemRightTextStatus }>{ user.timelogged }</Text>
                      </View>
                    ) }
                    onPress={ () => this.navigateToUserDetails(user.id) }
                    description={ user.datecreated + ' at ' + user.timecreated }
                    key={ `${ user.id }${ user.timecreated }${ user.timelogged }` }
                  />
                )
                }
              </List.Accordion>
            </List.Section>
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
