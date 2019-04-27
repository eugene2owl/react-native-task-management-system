import { PickerItem, SinglePickerMaterialDialog } from 'react-native-material-dialog';
import * as React from 'react';
import { Component } from 'react';
import { Color } from "../../../../assets/color";

interface Props {
  title: string;
  visible: boolean;
  items: PickerItem[];
  selectedItem: PickerItem;
  onOk: (selection: PickerItem) => void;
  onCancel: () => void;
}

interface State {
  visible: boolean;
}

export class SingleOptionDialog extends Component<Props> {

  state: State = {
    visible: false
  };

  render() {
    const { title, visible, items, selectedItem, onOk, onCancel } = this.props;

    return (
      <SinglePickerMaterialDialog
        scrolled={ true }
        titleColor={ Color.OCEAN }
        colorAccent={ Color.SUN }
        title={ title }
        items={ items }
        selectedItem={ selectedItem }
        visible={ visible }
        onOk={ result => onOk(result.selectedItem) }
        onCancel={ () => onCancel() }
      />
    );
  }
}
