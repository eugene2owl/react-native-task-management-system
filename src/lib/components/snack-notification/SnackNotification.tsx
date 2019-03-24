import styles from './styles';
import * as React from 'react';
import { Component } from 'react';
import { Snackbar } from 'react-native-paper';

interface Props {
  message: string;
  onDismiss: () => void;
}

export class SnackNotification extends Component<Props> {

  render() {
    const { message, onDismiss } = this.props;

    return (
      <Snackbar
        style={ styles.snackBar }
        visible={ !!message }
        onDismiss={ () => onDismiss() }
        duration={ 2000 }
        action={ { label: 'Ok', onPress: () => onDismiss() } }
      >
        { message }
      </Snackbar>
    );
  }
}
