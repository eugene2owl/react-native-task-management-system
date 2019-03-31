import styles from './styles';
import * as React from 'react';
import { Component } from 'react';
import { Text } from 'react-native-paper';
import { View } from "react-native";
// @ts-ignore
import DatePicker from 'react-native-datepicker';
import { Color } from "../../../../assets/color";

interface Props {
  label: string;
  onValueChange: (date: string) => void;
}

interface State {
  date: string;
}

export class FormDatePickerControl extends Component<Props> {

  state: State = {
    date: ''
  };

  private onValueChange(newValue: string): void {
    this.setState({ date: newValue });
    this.props.onValueChange(newValue);
  }

  render() {
    const { label } = this.props;

    return (
      <View style={ styles.container }>
        <Text style={ styles.pickerLabel }>{ label }</Text>
        <DatePicker
          style={ { width: 200 } }
          date={ this.state.date }
          mode="date"
          placeholder="Select Date"
          format="YYYY-MM-DD"
          minDate="2019-04-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={ {
            dateTouchBody: {
              height: 55
            },
            dateIcon: {
              position: 'absolute',
              left: 10,
              top: 13,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: Color.ASPHALT,
            },
            dateText: {
              color: Color.SUN
            },
            placeholderText: {
              color: Color.OCEAN
            },
          } }
          onDateChange={ (date: string) => this.onValueChange(date) }
        />
      </View>
    );
  }
}
