import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AUTHENTICATE_USER,
  CREATE_NOTE,
  CREATE_USER,
  DARK_MODE,
  DELETE_NOTE,
  GET_NOTE,
  IS_USER_LOGGED_IN,
  LIST_NOTES,
  LOG_OUT,
  RELOAD,
  USER_NOT_LOGGED_IN
} from './constants';
import { defaultUrl, authenticate, users, notes } from '../environment/env';

export const PostApi = (user) => async (dispatch) => {
  const url = `${defaultUrl}/${users}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        name: user.username,
        mobile: user.mobile,
        socialId: user.id
      })
    });
    const json = await response.json();
    if (json.status === true) {
      dispatch({
        type: CREATE_USER,
        id: json.body.id
      });
    } else {
      console.log(' API is working but message has error', json.message);
      if (user.id != null) {
        //Authentication for social id
        const url2 = `${defaultUrl}/${authenticate}`;

        try {
          const response = await fetch(url2, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              socialId: user.id
            })
          });
          const json = await response.json();
          if (json.status === true) {
            dispatch({
              type: AUTHENTICATE_USER,
              id: json.id
            });
          } else {
            console.log('API is Working but ', json.message);
          }
        } catch (error) {
          console.log('Outside Fetch', error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const Authenticate = (user) => async (dispatch) => {
  const url = `${defaultUrl}/${authenticate}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    });
    const json = await response.json();
    if (json.status === true) {
      dispatch({
        type: AUTHENTICATE_USER,
        id: json.id
      });
    } else {
      console.log('API is Working but ', json.message);
    }
  } catch (error) {
    console.log('Outside Fetch', error);
  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  try {
    const json = await AsyncStorage.getItem('cache');
    if (json !== null) {
      let object = JSON.parse(json);
      let userId = object.id;
      let darkMode = object.darkMode;
      dispatch({
        type: IS_USER_LOGGED_IN,
        id: userId,
        darkMode
      });
    } else {
      dispatch({
        type: USER_NOT_LOGGED_IN
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const DarkMode = () => {
  return {
    type: DARK_MODE
  };
};

export const LogOut = () => {
  return {
    type: LOG_OUT
  };
};

export const createNote = (id, note) => async (dispatch) => {
  let url = `${defaultUrl}/${notes}/${id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notes: [
          {
            title: note.title,
            data: note.note
          }
        ]
      })
    });
    const json = await response.json();
    if (json.status === true) {
      let unformatedData = json.data;
      let noteTitle = '';
      let latestTitle = '';
      if (unformatedData.length != 0) {
        noteTitle = unformatedData.reduce(
          (accumulator, current, currentIndex) => {
            if (currentIndex === 0) {
              accumulator.push({ title: current.title });
              return accumulator;
            } else {
              let filteredArray = accumulator.filter(
                (obj) => obj.title !== current.title
              );
              accumulator = filteredArray;
              accumulator.push({ title: current.title });
              return accumulator;
            }
          },
          []
        );
        unformatedData.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        latestTitle = unformatedData[0].title;
      }

      dispatch({
        type: CREATE_NOTE,
        data: json.data,
        noteTitle: noteTitle,
        latestTitle: latestTitle
      });
    } else {
      console.log(' API is working but message has error', json.message);
    }
  } catch (e) {
    console.log(e);
  }
};
export const getNotes = (id) => async (dispatch) => {
  let url = `${defaultUrl}/${notes}/${id}`;
  console.log('Inside Get');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (json.status === true) {
      let unformatedData = json.response;
      let noteTitle = '';
      let latestTitle = '';
      if (unformatedData.length != 0) {
        noteTitle = unformatedData.reduce(
          (accumulator, current, currentIndex) => {
            if (currentIndex === 0) {
              accumulator.push({ title: current.title });
              return accumulator;
            } else {
              let filteredArray = accumulator.filter(
                (obj) => obj.title !== current.title
              );
              accumulator = filteredArray;
              accumulator.push({ title: current.title });
              return accumulator;
            }
          },
          []
        );
        unformatedData.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        latestTitle = unformatedData[0].title;
      }

      dispatch({
        type: GET_NOTE,
        data: json.response,
        noteTitle: noteTitle,
        latestTitle: latestTitle
      });
    } else {
      console.log(' API is working but message has error', json.message);
    }
  } catch (e) {
    console.log(e);
  }
};

export const listNotes = (data) => {
  return {
    type: LIST_NOTES,
    data: data
  };
};

export const deleteNote = (id, noteId) => async (dispatch) => {
  let url = `${defaultUrl}/${notes}/${id}/${noteId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = response.json();
    if (json.status === true) {
      console.log('note deleted');
    }
  } catch (e) {
    console.log(e);
  }
};
