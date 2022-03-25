import { 
  RESET_BOARD,
  UPDATE_BOARD_STATE,
  UPDATE_WINNER
} from '@actions/types';

const initialBoardState = {0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null};

const initialState = {
  activePlayer: 1,
  startingPlayer: 1,
  winner: null,
  wins: {
    player_one: 0,
    player_two: 0
  },
  matchesPlayed: 0,
  boardState: initialBoardState,
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    case RESET_BOARD:
      return {
        ...state,
        activePlayer: state.startingPlayer === 1 ? 2 : 1,
        startingPlayer: state.startingPlayer === 1 ? 2 : 1,
        winner: null,
        matchesPlayed: (state.matchesPlayed + 1),
        boardState: {0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
      };
      
    case UPDATE_BOARD_STATE:
      return {
        ...state,
        boardState: action.value,
        activePlayer: state.activePlayer === 1 ? 2 : 1
      };
      
    case UPDATE_WINNER:
      return {
        ...state,
        winner: action.value,
        wins: {
          player_one: action.value === 1 ? state.wins.player_one + 1 : state.wins.player_one,
          player_two: action.value === 2 ? state.wins.player_two + 1 : state.wins.player_two,
        },
      };
        
    default:
      return state;
  }
};