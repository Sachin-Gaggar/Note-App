import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { PostApi } from '../services/action';
import { styles } from './styles';
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        repassword: '',
        mobile: '',
        id: null
      },

      mobileError: false,
      passwordSecure: true,
      repeatPasswordSecure: true,
      emailError: false,
      passwordError: false,
      usernameError: false,
      passwordNotMatch: false
    };
  }

  validator = () => {
    this.setState({
      emailError: false,
      passwordError: false,
      mobileError: false,
      usernameError: false,
      passwordNotMatch: false
    });
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.state.user.email
      )
    ) {
      this.setState({ emailError: true });
      return;
    } else if (!/^\S{4,}$/.test(this.state.user.username)) {
      this.setState({ usernameError: true });
      return;
    } else if (
      isNaN(this.state.user.mobile) ||
      this.state.user.mobile.length !== 10
    ) {
      this.setState({ mobileError: true });
      return;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/.test(
        this.state.user.password
      )
    ) {
      this.setState({ passwordError: true });
      return;
    } else if (this.state.user.password !== this.state.user.repassword) {
      this.setState({ passwordNotMatch: true });
    }
    this.props.CreateUser(this.state.user);
  };

  render() {
    const { user } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.boldHeading}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.toggle()}>
            <Text style={styles.normalHeading}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraBody}>
          <View style={styles.cameraCircle}>
            <Image
              style={styles.camera}
              source={require('../assets/camera.png')}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.body}>
          <Input
            placeholder="Email Address"
            onChangeText={(email) =>
              this.setState({ user: { ...user, email } })
            }
            error={this.state.emailError}
            text={'Email Address is in wrong format'}
          />

          <Input
            placeholder="Username"
            onChangeText={(username) =>
              this.setState({ user: { ...user, username } })
            }
            error={this.state.usernameError}
            text={'Username should have minimum length 4 and no white spaces'}
          />

          <Input
            placeholder="Mobile Number"
            onChangeText={(mobile) =>
              this.setState({ user: { ...user, mobile } })
            }
            error={this.state.mobileError}
            text={'Enter 10 digit mobile number'}
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

          <Input
            placeholder="Repeat Password"
            secureTextEntry={this.state.repeatPasswordSecure}
            onChangeText={(repassword) =>
              this.setState({ user: { ...user, repassword } })
            }
            error={this.state.passwordNotMatch}
            text={'Password did not matched'}
            eyeIconVisible={true}
            onPress={() =>
              this.setState({
                repeatPasswordSecure: !this.state.repeatPasswordSecure
              })
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.validator()}>
            <Image style={styles.img} source={require('../assets/right.png')} />
            <Text style={styles.buttonTxt}>Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text style={styles.normalHeading}>Terms of Service</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    CreateUser: (user) => dispatch(PostApi(user))
  };
};

export default connect(null, mapDispatchToProps)(Signin);
