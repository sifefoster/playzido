import { board } from './board';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  boardState: board
});