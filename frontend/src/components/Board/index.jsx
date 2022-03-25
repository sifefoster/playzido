import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateBoard, resetBoard, updateWinner } from '@actions';

import Loader from '@components/Loader'; 

import { 
  Wrapper,
  GameActionsWrapper,
  GameBoard,
  Button,
  Results,
  PlayerInfo,
  Matches
} from './style.js'

const icon_x = <img src="/img/cross.svg" width="20" alt="Cross Image" />;
const icon_o = <img src="/img/circle.svg" width="36" alt="Circle Image" />;

const api_url = 'http://localhost:3030/';

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
}

const Board = (props) => {
  const { 
    updateBoard, 
    resetBoard,
    updateWinner,
    activePlayer,
    winner,
    wins,
    matchesPlayed,
    boardState
  } = props;

  const [loading, setLoading] = useState(false);

  const getPlayerNumber = string => {
    return (string.toLowerCase() === "x" ? "1" : "2");
  }

  const renderIcon = value => {
    if (value === null) return;

    return ((value.toLowerCase() === 'x' ? icon_x : icon_o))
  }

  const handlePositionClick = async (position) => {
    if (boardState[position] === null) {
      let board = boardState;
      board[position] = activePlayer === 1 ? 'x' : 'o';
      updateBoard(board, activePlayer);
    }

    setLoading(true);
    const data = {};
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({board: boardState})
      });
      const data = await response.json();

      const winnerPlayer = data.data.winner;
      if (winnerPlayer && winnerPlayer !== 'tie') {
        updateWinner(winnerPlayer.toLowerCase() === 'x' ? 1 : 2);
        toast.success(`Player ${getPlayerNumber(winnerPlayer)} has won the game!`, toastConfig);
      } else if (winnerPlayer === 'tie') {
        toast.warning('We have a tie! Please reset the game.', toastConfig);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <ToastContainer />

      {loading && (
        <Loader />
      )}

      <GameActionsWrapper>
        <Results>
          <PlayerInfo 
            active={activePlayer === 1} 
            winner={winner === 1}
          >
            <span>x</span>
            Player 1: 
            <span>{wins.player_one}</span>
          </PlayerInfo>
          <Button
            onClick={() => resetBoard()}
          >
            reset
          </Button>
          <PlayerInfo 
            active={activePlayer === 2}
            winner={winner === 2}
          >
            <span>o</span>
            Player 2:
            <span>{wins.player_two}</span>
          </PlayerInfo>
        </Results>
      </GameActionsWrapper>

      <GameBoard>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((button, index) => (
          <Button
            key={index}
            disabled={boardState[index] !== null || winner !== null || loading}
            onClick={() => handlePositionClick(index.toString())}
          >
            {renderIcon(boardState[index])}
          </Button>
        ))}
      </GameBoard>

      <Matches>Matches Played: {matchesPlayed}</Matches>

    </Wrapper>
  );
}

const storeStateProps = store => ({
  activePlayer: store.boardState.activePlayer,
  winner: store.boardState.winner,
  matchesPlayed: store.boardState.matchesPlayed,
  wins: {
    player_one: store.boardState.wins.player_one,
    player_two: store.boardState.wins.player_two
  },
  boardState: store.boardState.boardState,
});

const storeDispatchToProps = dispatch =>
  bindActionCreators({ updateBoard, resetBoard, updateWinner }, dispatch);

export default connect(storeStateProps, storeDispatchToProps)(Board);
  