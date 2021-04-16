const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  txt: {
    width: '100%',
    flexWrap: 'wrap',
    fontSize: 18
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: '#DDDDDD'
  },
  boldHeading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  normalHeading: {
    fontSize: 20,
    color: '#AAA',
    textAlign: 'center'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  img: {
    width: 30,
    height: 30
  },
  eye: {
    position: 'absolute',
    right: 0
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  header: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cameraBody: {
    flex: 2
  },
  cameraCircle: {
    borderRadius: 70,
    borderColor: '#DDDDDD',
    padding: 20,
    borderWidth: 1
  },
  body: {
    flex: 6,
    justifyContent: 'space-around',
    width: '80%'
  },
  footer: {
    flex: 2,
    justifyContent: 'space-around'
  },
  footerLogin: {
    flex: 3,
    width: '90%',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#FFFFFF',
    shadowColor: '#AAAAAA',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 1
    },
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1,
    marginTop: 20
  },
  buttonTxt: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 10
  },
  errorTxt: {
    color: 'red',
    fontSize: 12
  }
});
