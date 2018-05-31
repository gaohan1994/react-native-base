
import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RouteConfig from './src/route';
import StackNavigatorConfig from './src/stackNavigatorConfig';

interface Props { }
interface State { }

const Navigator = StackNavigator(RouteConfig, StackNavigatorConfig);

class App extends Component <Props, State> {
  render() {
    return (
      <Navigator/>
    );
  }
}

const styles = StyleSheet.create({

});

export default App;