import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { taskService } from "../../lib/network/http-services/task-service";
import { HttpError } from "../../lib/network/common/http-error";
import { TasksStack } from "../../navigation/routes";
import { SearchHeader } from "../../lib/components/headers/search-header/SearchHeader";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { List } from "react-native-paper";
import { Color } from "../../assets/color";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { TaskStatus } from "../../lib/models/task/task-status";
import { TaskTimeline } from "../../lib/models/task/task-timeline";

interface State {
  taskTimeliness: TaskTimeline[];
  searchOpened: boolean;
  searchText: string;
  snackBarMessage: string;
  refreshing: boolean;
  httpReqInProcess: boolean;
}

export class TaskStatusFlowScreen extends Component {

  state: State = {
    taskTimeliness: [],
    searchOpened: false,
    searchText: '',
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

    taskService.getTimeline(this.state.searchText)
      .then((response: TaskTimeline[]) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false, refreshing: false }));
  }

  private processResponse(response: TaskTimeline[]): void {
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ taskTimeliness: response });
  }

  private processError = (error: HttpError) => this.showOnStackBar(error.message);

  private showOnStackBar = (message: string) => this.setState({ snackBarMessage: message });

  private getIcon(status: string): string {
    try {
      const keys = Object.keys(TaskStatus.value).map(key => key.replace(/_/g, ' '));
      const key = (keys.find(key => key === status) as string).replace(/ /g, '_');
      // @ts-ignore
      return TaskStatus.value[key].icon;
    } catch (e) {
      return 'tab';
    }
  }

  private navigateToUserDetails = (id: number) => this.navigation.navigate(TasksStack.TASK_DETAILS, { id: id });

  render(): ReactNode {
    const openSearchIcon = { name: 'search', onPress: () => this.setState({ searchOpened: true }) };
    const searchIcon = {
      onPress: (text: string) => {
        this.state.searchText = text;
        this.requestContent();
      }
    };
    const closeSearchIcon = {
      onPress: () => {
        this.setState({ searchOpened: false });
        this.state.searchText = '';
        this.requestContent();
      }
    };

    return (
      <View style={ styles.container }>
        { this.state.searchOpened ?
          <SearchHeader searchIcon={ searchIcon } closeIcon={ closeSearchIcon }/>
          :
          <ScreenHeader text="Task Status Flow" rightIcon={ openSearchIcon }/>
        }

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
              <List.Accordion
                title={ this.state.taskTimeliness.length + ' task timelines found' }
                left={ props => <List.Icon { ...props } icon="list"/> }
                description="By current filter options"
                expanded={ true }
              >
                { this.state.taskTimeliness.map((timeline: TaskTimeline) =>
                  <List.Item
                    title={ timeline.taskname }
                    style={ styles.listItem }
                    left={ props => <List.Icon { ...props } icon={ this.getIcon(timeline.status) }
                                               color={ Color.LIGHT }/> }
                    right={ () => (
                      <View style={ styles.listItemRight }>
                        <Text style={ styles.listItemRightTextStatus }>{ timeline.status }</Text>
                        <Text
                          style={ styles.listItemRightDescription }>{ `${ timeline.datecreated } at ${ timeline.timecreated }` }</Text>
                      </View>
                    ) }
                    description={ 'By ' + timeline.username }
                    key={ `${ timeline.taskid }${ timeline.status }` }
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
