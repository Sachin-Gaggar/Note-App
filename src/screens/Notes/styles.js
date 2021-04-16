import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

  list: {
    width: '90%'
  },
  footerDarkTxt: {
    color: '#eeeeee'
  },
  goBackContainer: {
    alignSelf: 'stretch'
  },
  goBacktxt: {
    color: 'blue',
    textAlign: 'left',
    fontSize: 17
  },
  darkColor: {
    color: '#ffd369'
  },
  addView: {},
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
  header: {
    flexDirection: 'row'
  },
  heading: {
    fontSize: 25
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: '#EEEEEE',
    padding: 20,
    width: '80%',
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  darkItems: {
    backgroundColor: '#393e46'
  },
  latestItem: {
    backgroundColor: '#EEEEEE'
  },
  title: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold'
  },
  red: {
    color: 'red'
  }
});
