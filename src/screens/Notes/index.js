import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { saveId } from '../../utils/functions';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import { DarkMode, LogOut } from '../../services/action';
import CustomDrawer from '../../components/CustomDrawer';
import MyNotes from './MyNotes';

const Drawer = createDrawerNavigator();

class Notes extends React.Component {
  constructor(props) {
    super(props);
    saveId(this.props.id, this.props.darkMode);
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Front"
          drawerContent={(props) => (
            <CustomDrawer
              {...props}
              darkMode={this.props.darkMode}
              id={this.props.id}
              toggleDarkMode={() => this.props.toggleDarkMode()}
              logOut={() => this.props.logOut()}
            />
          )}>
          <Drawer.Screen name="My Notes" component={MyNotes} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleDarkMode: () => dispatch(DarkMode()),
    logOut: () => dispatch(LogOut())
  };
};
const mapStateToProps = (state) => {
  return {
    id: state.id.id,
    darkMode: state.id.darkMode
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
