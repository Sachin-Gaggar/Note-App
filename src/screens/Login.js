import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { Authenticate, PostApi } from '../services/action';
import { styles } from './styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInGoogle } from '../utils/functions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: '', password: '', name: null, id: null, mobile: null },
      passwordSecure: true,
      usernameError: false
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '174681359161-s2a3j9nl1vvqn64q8avcu7vaonpvhpm2.apps.googleusercontent.com'
    });
  }
  validator = () => {
    this.setState({ usernameError: false });
    if (!/^\S{4,}$/.test(this.state.user.username)) {
      this.setState({ usernameError: true });
      return;
    }
    this.props.CheckUser(this.state.user);
  };
  googleSignin = async () => {
    const user = await signInGoogle();
    if (user) {
      this.setState({
        user: {
          username: user.givenName,
          password: user.givenName,
          name: user.givenName,
          id: user.id,
          mobile: user.id
        }
      });
      this.props.CreateUser(this.state.user); //If user is login in for first time his request
      //will be used to create user and if he is already has created account
      //then he will be authenticated by social id.
    } else {
      console.log('Sign in Cancelled');
    }
  };
  render() {
    const { user } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.boldHeading}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.toggle()}>
            <Text style={styles.normalHeading}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraBody}>
          <View style={styles.cameraCircle}>
            <Image
              style={styles.camera}
              source={require('../assets/user.png')}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={styles.body}>
          <Input
            placeholder="Username"
            onChangeText={(username) =>
              this.setState({ user: { ...user, username } })
            }
            error={this.state.usernameError}
            text={'Username should have minimum length 4 and no white spaces'}
          />
          <Input
            placeholder="Password"
            secureTextEntry={this.state.passwordSecure}
            onChangeText={(password) =>
              this.setState({ user: { ...user, password } })
            }
            error={this.state.passwordError}
            text={
              'Password should have min 6 Characters containing at least one of the Uppercase , lowercase , special character and number'
            }
            eyeIconVisible={true}
            onPress={() =>
              this.setState({ passwordSecure: !this.state.passwordSecure })
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.validator()}>
            <Image style={styles.img} source={require('../assets/right.png')} />
            <Text style={styles.buttonTxt}>LOG IN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.footerLogin}>
          <Text style={styles.normalHeading}>Log in with</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => this.googleSignin()}>
              <Image
                style={styles.icon}
                source={require('../assets/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require('../assets/github.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require('../assets/twitter.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.icon} source={require('../assets/fb.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    CreateUser: (user) => dispatch(PostApi(user)),

    CheckUser: (user) => dispatch(Authenticate(user))
  };
};

export default connect(null, mapDispatchToProps)(Login);
