import styles from './styles';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { Component } from "react";

interface Props {
  onIconPress: (query: string) => void;
}

interface State {
  query: string;
}

export default class SearchBarWrapper extends Component<Props> {

  state: State = {
    query: ''
  };

  render() {
    const { onIconPress } = this.props;

    return (
      <Searchbar
        placeholder="Search"
        value={ this.state.query }
        onChangeText={ query => this.setState({ query: query }) }
        onIconPress={ () => onIconPress(this.state.query) }
        style={ styles.searchBar }
      />
    );
  }
}
