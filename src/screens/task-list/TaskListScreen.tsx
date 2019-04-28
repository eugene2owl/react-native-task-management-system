import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { TasksStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { SearchHeader } from "../../lib/components/headers/search-header/SearchHeader";
import { TaskListItem } from "../../lib/models/task/task-list";
import { HttpError } from "../../lib/network/common/http-error";
import { taskService } from "../../lib/network/http-services/task-service";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";
import { FAB, List, Switch, Text } from "react-native-paper";
import { Color } from "../../assets/color";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { FormPickerControl } from "../../lib/components/form-controls/form-picker/FormPickerControl";
import { TaskStatus } from "../../lib/models/task/task-status";
import { FormPickerItem } from "../../lib/components/form-controls/form-picker/utils/form-picker-item";

interface State {
  tasks: TaskListItem[];
  searchOpened: boolean;
  searchText: string;
  statusControlValue: number;
  expiredOnlyControlValue: boolean;
  snackBarMessage: string;
  refreshing: boolean;
  httpReqInProcess: boolean;
}

export class TaskListScreen extends Component {

  state: State = {
    tasks: [],
    searchOpened: false,
    searchText: '',
    statusControlValue: 0,
    expiredOnlyControlValue: false,
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

    taskService.getAll(
      10,
      this.state.searchText,
      this.state.statusControlValue,
      this.state.expiredOnlyControlValue
    )
      .then((response: TaskListItem[]) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false, refreshing: false }));
  }

  private processResponse(response: TaskListItem[]): void {
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ tasks: response });
  }

  private processError = (error: HttpError) => this.showOnStackBar(error.message);

  private showOnStackBar = (message: string) => this.setState({ snackBarMessage: message });

  private navigateToTaskDetails = (id: number) => this.navigation.navigate(TasksStack.TASK_DETAILS, { id: id });
  private navigateToCreateTask = () => this.navigation.navigate(TasksStack.CREATE_TASK);

  private get statusFilterValues(): FormPickerItem[] {
    const keys = Object.keys(TaskStatus.value);
    // @ts-ignore
    return keys.map(key => ({ label: TaskStatus.value[key].label, value: TaskStatus.value[key].id }));
  }

  private isExpired(dateString: string, status: string): boolean {
    if (status !== 'IN PROGRESS' && status !== 'TO PERFORM') {
      return false;
    }
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    const date = new Date(dateString.replace(pattern,'$3-$2-$1'));
    return date < new Date();
  }

  render(): ReactNode {
    const openSearchIcon = { name: 'search', onPress: () => this.setState({ searchOpened: true }) };
    const searchIcon = {
      onPress: (text: string) => {
        this.state.searchText = text;
        this.requestContent();
      }
    };
    const closeSearchIcon = { onPress: () => this.setState({ searchOpened: false }) };

    return (
      <View style={ styles.container }>
        { this.state.searchOpened ?
          <SearchHeader searchIcon={ searchIcon } closeIcon={ closeSearchIcon }/>
          :
          <ScreenHeader text="Task List" rightIcon={ openSearchIcon }/>
        }

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        { this.state.searchOpened ?
          <View style={ styles.filterPanel }>
            <View style={ styles.formPickerControlContainer }>
              <FormPickerControl
                items={ this.statusFilterValues }
                onValueChange={ (itemValue: number) => {
                  this.state.statusControlValue = itemValue;
                  this.requestContent();
                } }
                defaultItem={ { label: 'All', value: 0 } }
                label="Status"
              />
            </View>
            <View style={ styles.switchContainer }>
              <Text
                style={ styles.switchLabel }>{ `Overdue only (${ this.state.expiredOnlyControlValue ? 'on' : 'off' })` }</Text>
              <Switch
                value={ this.state.expiredOnlyControlValue }
                onValueChange={ () => {
                  this.state.expiredOnlyControlValue = !this.state.expiredOnlyControlValue;
                  this.requestContent();
                } }
              />
            </View>
          </View>
          :
          null
        }

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
                title={ this.state.tasks.length + ' tasks found' }
                left={ props => <List.Icon { ...props } icon="list"/> }
                description="By current filter options"
                expanded={ true }
              >
                { this.state.tasks.map(task =>
                  <List.Item
                    title={ task.name }
                    style={ styles.listItem }
                    left={ props => <List.Icon { ...props } icon="tab" color={ Color.LIGHT }/> }
                    right={ () => (
                      <View style={ styles.listItemRight }>
                        <Text style={ styles.listItemRightTextStatus }>{ task.status }</Text>
                        <Text style={ this.isExpired(task.deadline, task.status) ? styles.listItemRightTextDeadlineExpired : styles.listItemRightTextDeadline }>
                          { task.deadline }
                        </Text>
                      </View>
                    ) }
                    description={ task.assignedTo.name ? 'Assigned to ' + task.assignedTo.name : '' }
                    onPress={ () => this.navigateToTaskDetails(task.id) }
                    key={ task.id }
                  />
                )
                }
              </List.Accordion>
            </List.Section>
          </View>
        </ScrollView>

        <FAB
          style={ styles.fab }
          icon="add"
          disabled={ this.state.httpReqInProcess }
          onPress={ () => this.navigateToCreateTask() }
        />

        <SnackNotification
          message={ this.state.snackBarMessage }
          onDismiss={ () => this.showOnStackBar('') }
        />
      </View>
    );
  }
}
