import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Button, View } from "react-native";
import { TasksStack, UsersStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { TaskDetails } from "../../lib/models/task/task";
import { HttpError } from "../../lib/network/common/http-error";
import { taskService } from "../../lib/network/http-services/task-service";
import { Chip, Text } from "react-native-paper";
import { Lookup } from "../../lib/models/common/Lookup";
import { appPaperTheme } from "../../assets/paper-theme";
import { Color } from "../../assets/color";

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
  id: number,
  taskDetails: TaskDetails;
  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class TaskDetailsScreen extends Component {

  state: State = {
    id: 0,
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
      .then((response: TaskDetails) => this.processResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processResponse(response: TaskDetails): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ taskDetails: response });
  }

  private processError(error: HttpError): void {
    this.showOnStackBar(error.message);
  }

  private showOnStackBar(message: string): void {
    this.setState({ snackBarMessage: message })
  }

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

        <View style={ styles.contentContainer }>
          <View style={ styles.baseInfoContainer }>
            <Text style={ styles.nameLabel }>{ details.name }</Text>
            <View style={ styles.dateCreatedInfoContainer }>
              <Text style={ styles.dateCreatedLabel }>Created</Text>
              <Text style={ styles.dateCreatedLabel }>{ `${ details.dateCreated } at ${ details.timeCreated }` }</Text>
            </View>
          </View>

          <View style={ styles.statusInfoContainer }>
            <Text style={ styles.statusLabel }>{ details.status }</Text>
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
              <Text>Children</Text>
              <View style={ styles.childrenChipContainer }>
                {
                  !!details.children && details.children.map(child =>
                    <Chip
                      theme={ chipThemeOcean }
                      mode="outlined"
                      style={ styles.childChip }
                      onPress={ () => this.navigateToTaskDetails(child.id) }
                      key={ child.id }
                    >{ child.name }</Chip>
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
