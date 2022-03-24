const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkForCombinations = (board) => {
  if (!board) return;

  let winner = null;
  winningCombinations.forEach((combination, index) => {
    if (
      board[combination[0]] && 
      board[combination[0]] === board[combination[1]] && 
      board[combination[0]] === board[combination[2]]
    ) {
      winner = board[combination[0]];
    }
  });

  return winner;
};

app.post('/', async (req, res) => {
  const winner = await checkForCombinations(req.body.board);

  if (Object.values(req.body.board).every(key => key !== null) && winner === null) {
    return res.send({response: 'success', data: {winner: 'tie'}})
  }

  return res.send({response: 'success', data: {winner: winner}});
});

app.listen(3030, () => {
  console.log('listening on port 3030');
});