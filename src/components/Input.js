import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../screens/styles';

const Input = (props) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          style={styles.txt}
          secureTextEntry={props.secureTextEntry}
        />
        {props.eyeIconVisible ? (
          <TouchableOpacity onPress={props.onPress} style={styles.eye}>
            <Image style={styles.img} source={require('../assets/see.png')} />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.error ? (
        <View>
          <Text style={styles.errorTxt}>{props.text}</Text>
        </View>
      ) : null}
    </>
  );
};

export default Input;
