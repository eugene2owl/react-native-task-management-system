import styles from './styles';
import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import { FormPickerItem } from "./utils/form-picker-item";
import { Picker, View } from "react-native";
import { Color } from "../../../../assets/color";

interface Props {
  items: FormPickerItem[];
  onValueChange: (itemValue: number) => void;
}

interface State {
  selectedItemValue: number;
}

export class FormPickerControl extends Component<Props> {

  state: State = {
    selectedItemValue: 0
  };

  private defaultItem: FormPickerItem = { label: '', value: 0 };

  private onValueChange(newValue: number): void {
    this.setState({ selectedItemValue: newValue });
    this.props.onValueChange(newValue);
  }

  render() {
    const { items } = this.props;
    items.unshift(this.defaultItem);

    return (
      <View style={ styles.container }>
        <Picker
          selectedValue={ this.state.selectedItemValue }
          style={ styles.picker }
          onValueChange={ (itemValue) => this.onValueChange(itemValue) }
        >
          {
            items.map(item => (
              <Picker.Item
                label={ item.label }
                value={ item.value }
                key={ item.value }
              />
            ))
          }
        </Picker>
      </View>
    );
  }
}
