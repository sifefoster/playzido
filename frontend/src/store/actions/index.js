import { 
  RESET_BOARD,
  UPDATE_BOARD_STATE,
  UPDATE_WINNER
} from '@actions/types';

export const resetBoard = () => ({
  type: RESET_BOARD
});

export const updateBoard = (board) => ({
  type: UPDATE_BOARD_STATE,
  value: board
});

export const updateWinner = (winner) => ({
  type: UPDATE_WINNER,
  value: winner
});