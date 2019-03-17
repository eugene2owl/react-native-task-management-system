import styles from './styles';
import * as React from "react";
import { Component, ReactNode } from "react";
import { Alert, Button, View } from "react-native";
import { TasksStack } from "../../navigation/routes";
import { ScreenHeader } from "../../lib/components/headers/screen-header/ScreenHeader";
import { SearchHeader } from "../../lib/components/headers/search-header/SearchHeader";

interface State {
  searchOpened: boolean;
  searchText: string;
}

export class TaskListScreen extends Component { // TODO add state and props separately

  state: State = {
    searchOpened: false,
    searchText: ''
  };

  // @ts-ignore
  private navigation = this.props.navigation;

  private navigateToDetails(): void {
    this.navigation.navigate(TasksStack.TASK_DETAILS);
  }

  render(): ReactNode {
    const openSearchIcon = {
      name: 'search',
      onPress: () => this.setState(prev => ({ ...prev, searchOpened: true }))
    };

    const searchIcon = {
      onPress: (text: string) => Alert.alert(text)
    };
    const closeSearchIcon = {
      onPress: () => this.setState(prev => ({ ...prev, searchOpened: false }))
    };

    return (
      <View style={ styles.container }>
        { this.state.searchOpened ?
          <SearchHeader text={ this.state.searchText } searchIcon={ searchIcon } closeIcon={ closeSearchIcon }/>
          :
          <ScreenHeader text="Task List" rightIcon={ openSearchIcon }/>
        }

        <Button
          title="Navigate to Task Details Screen"
          onPress={ () => this.navigateToDetails() }
        />
      </View>
    );
  }
}
