import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { View } from "react-native";
import { TasksStack, UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { TaskDetails } from "../../lib/models/task/task";
import { HttpError } from "../../lib/network/common/http-error";
import { taskService } from "../../lib/network/http-services/task-service";
import { Chip, Text } from "react-native-paper";
import { Lookup } from "../../lib/models/common/Lookup";
import { appPaperTheme } from "../../assets/paper-theme";
import { Color } from "../../assets/color";
import { SingleOptionDialog } from "../../lib/components/dialogs/single-option-dialog/SingleOptionDialog";
import { TaskStatus } from "../../lib/models/task/task-status";
import { PickerItem } from "react-native-material-dialog";
import { CentralSpinner } from "../../lib/components/central-spinner/CentralSpinner";

const defaultTaskDetails: TaskDetails = {
  id: 0,
  name: '',
  description: '',
  dateCreated: '',
  timeCreated: '',
  status: '',
  deadline: '',
  parent: { id: 0, name: '' },
  children: [],
  createdBy: { id: 0, name: '' },
  assignedBy: { id: 0, name: '' },
  assignedTo: { id: 0, name: '' },
  error: { message: '', status: 200 }
};

interface State {
  id: number;
  statusDialogVisible: boolean;
  taskDetails: TaskDetails;
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class TaskDetailsScreen extends Component {

  state: State = {
    id: 0,
    statusDialogVisible: false,
    taskDetails: defaultTaskDetails,
    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.state.id = this.navigation.state.params.id;
    this.requestContent();
  }

  private requestContent(): void {
    this.setState({ httpReqInProcess: true });

    taskService.getDetails(this.state.id)
      .then((response: TaskDetails) => this.processGetResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processGetResponse(response: TaskDetails): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ taskDetails: response });
  }

  private processPostResponse(status: PickerItem): void {
    this.showOnStackBar('Status successfully changed!');
    this.state.taskDetails.status = status.label;
    this.setState({ taskDetails: this.state.taskDetails });
  }

  private processError = (error: HttpError): void => this.showOnStackBar(error.message);

  private showOnStackBar = (message: string) => this.setState({ snackBarMessage: message });

  private navigateToTimeLog = (id: number): void => this.navigation.navigate(TasksStack.TASK_TIME_LOG, { id: id });
  private navigateToUserDetails = (id: number) => this.navigation.navigate(UsersStack.USER_DETAILS, { id: id });
  private navigateToTaskDetails = (id: number) => this.navigation.navigate(TasksStack.TASK_DETAILS, { id: id });

  private extractChipId = (lookup?: Lookup) => lookup ? lookup.id : 0;
  private extractChipName = (lookup?: Lookup) => lookup ? lookup.name : '';

  private get assigned(): boolean {
    return !!this.state.taskDetails.assignedBy && !!this.state.taskDetails.assignedBy.id;
  }

  private get hasParent(): boolean {
    return !!this.state.taskDetails.parent && !!this.state.taskDetails.parent.id;
  }

  private get hasChildren(): boolean {
    return !!this.state.taskDetails.children && !!this.state.taskDetails.children.length;
  }

  private get statusValues(): PickerItem[] {
    const keys = Object.keys(TaskStatus.value);
    // @ts-ignore
    return keys.map(key => ({ label: TaskStatus.value[key].label, value: TaskStatus.value[key].id }));
  }

  private get currentStatusValue(): PickerItem {
    // @ts-ignore
    return this.statusValues.find(status => status.value === this.currentStatusId);
  }

  private get currentStatusId(): number {
    try {
      const keys = Object.keys(TaskStatus.value).map(key => key.replace(/_/g, ' '));

      const key = (keys.find(key => key === this.state.taskDetails.status) as string).replace(/ /g, '_');
      // @ts-ignore
      return TaskStatus.value[key].id;
    } catch (e) {
      return 1;
    }
  }

  private sendStatus(status: PickerItem): void {
    this.closeStatusDialog();
    taskService.setStatus(this.state.id, +status.value, 10)
      .then((response: any) => this.processPostResponse(status))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private openStatusDialog = () => this.setState({ statusDialogVisible: true });
  private closeStatusDialog = () => this.setState({ statusDialogVisible: false });

  render(): ReactNode {
    const details = this.state.taskDetails;

    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };
    const timelogIcon = { name: 'query-builder', onPress: () => this.navigateToTimeLog(this.state.id) };

    const chipThemeSun = JSON.parse(JSON.stringify(appPaperTheme));
    chipThemeSun.colors.text = Color.SUN;

    const chipThemeOcean = JSON.parse(JSON.stringify(appPaperTheme));
    chipThemeOcean.colors.text = Color.OCEAN;

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Task Details" leftIcon={ goBackIcon } rightIcon={ timelogIcon }/>

        <CentralSpinner animating={ this.state.httpReqInProcess }/>

        <SingleOptionDialog
          title="Set new status"
          items={ this.statusValues }
          selectedItem={ this.currentStatusValue }
          visible={ this.state.statusDialogVisible }
          onOk={ (selection: PickerItem) => this.sendStatus(selection) }
          onCancel={ this.closeStatusDialog }
        />

        <View style={ styles.contentContainer }>
          <View style={ styles.baseInfoContainer }>
            <Text style={ styles.nameLabel }>{ details.name }</Text>
            <View style={ styles.dateCreatedInfoContainer }>
              <Text style={ styles.dateCreatedLabel }>Created</Text>
              <Text style={ styles.dateCreatedLabel }>{ `${ details.dateCreated } at ${ details.timeCreated }` }</Text>
            </View>
          </View>

          <View style={ styles.statusInfoContainer }>
            <Text style={ styles.statusLabel } onPress={ this.openStatusDialog }>{ details.status }</Text>
            { !!details.deadline &&
            <Text style={ styles.deadlineLabel }>Deadline: { details.deadline }</Text>
            }
          </View>

          <View style={ styles.userChipsInfoContainer }>
            <View style={ styles.chipContainer }>
              <Text>Created by</Text>
              <Chip
                theme={ chipThemeOcean }
                mode="outlined"
                onPress={ () => this.navigateToUserDetails(details.createdBy.id) }
              >{ details.createdBy.name }</Chip>
            </View>
            {
              this.assigned &&
              <View style={ styles.chipContainer }>
                <Text>Assigned by</Text>
                <Chip
                  theme={ chipThemeOcean }
                  mode="outlined"
                  onPress={ () => this.navigateToUserDetails(this.extractChipId(details.assignedBy)) }
                >{ this.extractChipName(details.assignedBy) }</Chip>
              </View>
            }
            {
              this.assigned &&
              <View style={ styles.chipContainer }>
                <Text>Assigned to</Text>
                <Chip
                  theme={ chipThemeOcean }
                  mode="outlined"
                  onPress={ () => this.navigateToUserDetails(this.extractChipId(details.assignedTo)) }
                >{ this.extractChipName(details.assignedTo) }</Chip>
              </View>
            }
          </View>

          { this.hasParent &&
          <View style={ styles.parentChipContainer }>
            <View style={ styles.chipContainer }>
              <Text>Parent</Text>
              <Chip
                theme={ chipThemeSun }
                mode="outlined"
                onPress={ () => this.navigateToTaskDetails(this.extractChipId(details.assignedBy)) }
              >{ this.extractChipName(details.parent) }</Chip>
            </View>
          </View>
          }

          {
            this.hasChildren &&
            <View>
              <View style={ styles.childrenChipContainer }>
                {
                  !!details.children && details.children.map(child =>
                    <View style={ styles.chipContainer }>
                      <Text>Children</Text>
                      <Chip
                        theme={ chipThemeOcean }
                        mode="outlined"
                        style={ styles.childChip }
                        onPress={ () => this.navigateToTaskDetails(child.id) }
                        key={ child.id }
                      >{ child.name }</Chip>
                    </View>
                  )
                }
              </View>
            </View>
          }

          { !!details.description &&
          <View style={ styles.descriptionContainer }>
            <Text>Description</Text>
            <Text style={ styles.description }>{ details.description }</Text>
          </View>
          }
        </View>
      </View>
    );
  }
}
