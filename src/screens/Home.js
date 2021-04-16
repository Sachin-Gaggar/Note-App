import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../services/action';
import Login from './Login';
import Notes from './Notes';
import Signin from './SignIn';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInScreen: true
    };
  }
  componentDidMount() {
    this.props.isUserLoggedIn();
  }

  render() {
    const { isLoggedIn, isLoading } = this.props;
    if (!isLoading) {
      return (
        <>
          {isLoggedIn ? (
            <Notes />
          ) : this.state.signInScreen ? (
            <Signin toggle={() => this.setState({ signInScreen: false })} />
          ) : (
            <Login toggle={() => this.setState({ signInScreen: true })} />
          )}
        </>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' }
});
const mapDispatchToProps = (dispatch) => {
  return {
    isUserLoggedIn: () => dispatch(isUserLoggedIn())
  };
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.id.isLoggedIn,
    isLoading: state.id.isLoading
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
