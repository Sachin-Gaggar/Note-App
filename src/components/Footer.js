import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Footer = (props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.openDrawer()}>
        <Image
          style={styles.img}
          source={
            props.darkMode
              ? require('../assets/darkMenu.png')
              : require('../assets/menu.png')
          }
        />
        <Text
          style={[
            styles.footerTxt,
            props.darkMode ? styles.footerDarkTxt : null
          ]}>
          Menu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setAddModalVisible(true)}>
        <Image
          style={styles.addImg}
          source={
            props.darkMode
              ? require('../assets/darkAdd.png')
              : require('../assets/add.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default Footer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  darkContainer: {
    backgroundColor: '#222831'
  },
  img: {
    width: 30,
    height: 30
  },
  footerTxt: {
    fontSize: 20,
    color: 'red'
  },
  footerDarkTxt: {
    color: '#eeeeee'
  },
  footer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'space-between'
  },
  addImg: {
    height: 70,
    width: 70
  },
  heading: {
    fontSize: 25
  }
});
