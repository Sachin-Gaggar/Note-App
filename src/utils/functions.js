import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';

export const signInGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo.user;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
      console.log('Error in ggogle sign in');
    }
  }
};
export const saveId = async (id, darkMode) => {
  let object = { id, darkMode };

  try {
    const json = JSON.stringify(object);
    await AsyncStorage.setItem('cache', json);
  } catch (e) {
    console.log('Async Storage set', e);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem('cache');
  } catch (e) {
    console.log(e);
  }
};
