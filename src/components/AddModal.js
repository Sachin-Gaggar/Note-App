import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          this.props.darkMode ? styles.darkContainer : null
        ]}>
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={this.props.close}>
          <Text
            style={[
              styles.goBacktxt,
              this.props.darkMode ? styles.darkColor : null
            ]}>
            {'<'}My Notes
          </Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={[styles.addView]}>
            <Text
              style={[
                styles.heading,
                this.props.darkMode ? styles.darkColor : null
              ]}>
              Add
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.body}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Title"
              style={styles.input}
              onChangeText={this.props.onChangeTitle}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Note"
              numberOfLines={3}
              style={styles.input}
              onChangeText={this.props.onChangeNote}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.onSubmit();
              this.props.close();
            }}
            style={[
              styles.button,
              this.props.darkMode ? styles.darkColor : null
            ]}>
            <Text
              style={[
                styles.goBacktxt,
                this.props.darkMode ? styles.darkColor : null
              ]}>
              Submit
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  darkContainer: {
    backgroundColor: '#222831'
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1
  },
  body: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 9,
    justifyContent: 'space-around'
  },
  goBackContainer: {
    alignSelf: 'stretch'
  },
  goBacktxt: {
    color: 'blue',
    textAlign: 'left',
    fontSize: 17
  },
  addView: {
    flex: 1
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: 'red'
  },
  inputView: {
    width: '80%',
    padding: 15,
    backgroundColor: '#EEEEEE'
  },
  input: {
    width: '100%'
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    width: '70%',
    alignItems: 'center',
    borderRadius: 10
  },
  darkColor: {
    color: '#ffd369'
  }
});
