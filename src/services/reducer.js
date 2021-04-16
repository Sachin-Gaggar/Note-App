import { State } from 'react-native-gesture-handler';
import {
  AUTHENTICATE_USER,
  CREATE_NOTE,
  CREATE_USER,
  DARK_MODE,
  Dark_Mode,
  DELETE_NOTE,
  GET_NOTE,
  IS_USER_LOGGED_IN,
  LIST_NOTES,
  LOG_OUT,
  RELOAD,
  USER_NOT_LOGGED_IN
} from './constants';

const initialPostState = {
  id: '',
  isLoggedIn: false,
  isLoading: true,
  darkMode: false
};

export function PostAPIReducer(state = initialPostState, action) {
  if (action.type === CREATE_USER || action.type === AUTHENTICATE_USER) {
    return {
      ...state,

      id: action.id,
      isLoggedIn: true,
      isLoading: false
    };
  } else if (action.type === IS_USER_LOGGED_IN) {
    return {
      darkMode: action.darkMode,
      id: action.id,
      isLoggedIn: true,
      isLoading: false
    };
  } else if (action.type === USER_NOT_LOGGED_IN || action.type === LOG_OUT) {
    return {
      id: '',
      isLoggedIn: false,
      isLoading: false,
      darkMode: false
    };
  } else if (action.type === DARK_MODE) {
    return {
      ...state,
      darkMode: !state.darkMode
    };
  } else {
    return state;
  }
}

const initialNoteState = {
  data: [],
  isLoading: true,
  noteTitle: [],
  latestTitle: ''
};

export function NotesReducer(state = initialNoteState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        isLoading: false,
        data: action.data
      };

    case GET_NOTE:
      return {
        isLoading: false,
        data: action.data,
        noteTitle: action.noteTitle,
        latestTitle: action.latestTitle
      };
    case LOG_OUT:
      return {
        data: [],
        isLoading: true,
        noteTitle: [],
        latestTitle: ''
      };
    default:
      return state;
  }
}

const list = {
  data: ''
};

export function lsitReducer(state = list, action) {
  switch (action.type) {
    case LIST_NOTES:
      return {
        data: action.data
      };

    default:
      return state;
  }
}
