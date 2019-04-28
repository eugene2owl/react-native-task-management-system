import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { HttpError } from "../../lib/network/common/http-error";
import { SnackNotification } from "../../lib/components/snack-notification/SnackNotification";
import { UserCreateRequest, UserListItem, UserPreCreateData } from "../../lib/models/user/user";
import { Lookup } from "../../lib/models/common/Lookup";
import { userService } from "../../lib/network/http-services/user-service";
import { FormPickerItem } from "../../lib/components/form-controls/form-picker/utils/form-picker-item";
import { taskService } from "../../lib/network/http-services/task-service";
import { TaskCreateRequest, TaskPreCreateData } from "../../lib/models/task/task";
import { InitialsBasedAvatar } from "../../lib/components/icons/initials-based-avatar/InitialsBasedAvatar";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { FormPickerControl } from "../../lib/components/form-controls/form-picker/FormPickerControl";
import { Color } from "../../assets/color";
import { FormDatePickerControl } from "../../lib/components/form-controls/form-date-picker/FormDatePickerControl";

interface State {
  executors: Lookup[];
  parents: Lookup[];

  nameControlValue: string;
  descriptionControlValue: string;
  deadlineControlValue: string;
  parentControlValue: number;
  executorControlValue: number;

  snackBarMessage: string;
  httpReqInProcess: boolean;
}

export class CreateTaskScreen extends Component {

  state: State = {
    executors: [],
    parents: [],

    nameControlValue: '',
    descriptionControlValue: '',
    deadlineControlValue: '',
    parentControlValue: 0,
    executorControlValue: 0,

    snackBarMessage: '',
    httpReqInProcess: false
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  componentDidMount(): void {
    this.requestPreCreateData();
  }

  private requestPreCreateData(): void {
    this.setState({ httpReqInProcess: true });

    taskService.getPreCreateData(10)
      .then((response: TaskPreCreateData) => this.processPreCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processPreCreateResponse(response: TaskPreCreateData): void {
    if (response.error) {
      this.showOnStackBar(response.error.message);
      return;
    }
    this.setState({ executors: response.executors, parents: response.parents });
  }

  private get anyRequiredFormFieldAbsent(): boolean {
    return !this.state.nameControlValue;
  }

  private get formData(): TaskCreateRequest {
    const request: TaskCreateRequest = {
      projectId: 10,
      name: this.state.nameControlValue,
      createdBy: 11
    };
    if (this.state.deadlineControlValue) {
      request.deadline = this.state.deadlineControlValue;
    }
    if (this.state.descriptionControlValue) {
      request.description = this.state.descriptionControlValue;
    }
    if (this.state.parentControlValue) {
      request.parent = this.state.parentControlValue;
    }
    if (this.state.executorControlValue) {
      request.assignedTo = this.state.executorControlValue;
    }
    return request;
  }

  private sendFormData(): void {
    this.setState({ httpReqInProcess: true });
    console.log('Send form: ', this.formData);

    taskService.create(this.formData)
      .then((response: UserListItem) => this.processCreateResponse(response))
      .catch((error: HttpError) => this.processError(error))
      .finally(() => this.setState({ httpReqInProcess: false }));
  }

  private processCreateResponse(response: UserListItem): void {
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
    this.setState({ snackBarMessage: message });
  }

  private get executorPickerItems(): FormPickerItem[] {
    return this.state.executors.map(lookup => ({ label: lookup.name, value: lookup.id }));
  }

  private get parentPickerItems(): FormPickerItem[] {
    return this.state.parents.map(lookup => ({ label: lookup.name, value: lookup.id }));
  }

  render(): ReactNode {
    const goBackIcon = { name: 'keyboard-arrow-left', onPress: () => this.navigation.goBack() };

    return (
      <View style={ styles.container }>
        <ScreenHeader text="Create Task" leftIcon={ goBackIcon }/>

        <ScrollView
          style={ styles.scrollContainer }
          contentContainerStyle={ styles.scrollContainerContent }
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={ true }
        >

          <View style={ styles.contentContainer }>
            <View style={ styles.formContainer }>

              <TextInput
                style={ styles.nameControl }
                mode="outlined"
                label="Name"
                value={ this.state.nameControlValue }
                onChangeText={ text => this.setState({ nameControlValue: text }) }
              />

              <TextInput
                style={ styles.descriptionControl }
                mode="outlined"
                label="Description"
                value={ this.state.descriptionControlValue }
                onChangeText={ text => this.setState({ descriptionControlValue: text }) }
                multiline={ true }
              />

              <FormPickerControl
                items={ this.executorPickerItems }
                onValueChange={ (itemValue: number) => this.setState({ executorControlValue: itemValue }) }
                label="Executor"
              />

              <FormPickerControl
                items={ this.parentPickerItems }
                onValueChange={ (itemValue: number) => this.setState({ parentControlValue: itemValue }) }
                label="Parent Task"
              />
              <View style={ styles.formDatePickerControlContainer }>
                <FormDatePickerControl
                  label="Deadline"
                  onValueChange={ (date: string) => this.setState({ deadlineControlValue: date }) }
                />
              </View>
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
              Create Task
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
