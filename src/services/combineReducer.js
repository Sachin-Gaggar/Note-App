import { combineReducers } from 'redux';
import { lsitReducer, NotesReducer, PostAPIReducer } from './reducer';

export default combineReducers({
  id: PostAPIReducer,
  notes: NotesReducer,
  list: lsitReducer
});
