import { Map } from 'immutable';

function winner(board){
  const coordArr = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[2,0], [1,1], [0,2]]
  ]
  for(let x = 0; x < coordArr.length; x++) {
    if(streak(board, ...coordArr[x])) return streak(board, ...coordArr[x])
  }
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(!board.getIn([i,j])) return null
    }
  }
  return 'draw'
}

function streak(board, first, ...coords){
  const player = board.getIn(first)
  if (!player) return null
  for (let coord of coords) {
    if (board.getIn(coord) !== player) return null
  }
  return player
}

const turnReducer = (turn = 'X', action) => {
  if(action.type === 'MOVE') {
    return turn === 'X' ? 'O' : 'X'
  }
  return turn;
}

const boardReducer = (board = Map(), action) => {
  if(action.type === 'MOVE') {
    const newBoard = board.setIn(action.position, action.player);
    return newBoard
  }
  return board;
}

export default function reducer(state = {}, action) {
  if(bad(state, action)) {
    console.log(bad(state, action))
    return state;
  }
  const nextTurn = turnReducer(state.turn, action)
  const newBoard = boardReducer(state.board, action);
  const winnerState = winner(newBoard);
  return {
    board: newBoard,
    turn: nextTurn,
    winner: winnerState
  }
}

//ACTION TYPES
export const move = (player, position) => ({
  type: 'MOVE',
  position,
  player
})

function bad(state, action) {
  if(action.type !== 'MOVE') {
    return null
  }
  if(action.player !== state.turn) {
    return "It's not your turn!"
  }
  if(
    action.position[0] < 0 || action.position[0] > 2 || 
    action.position[1] < 0 || action.position[1] > 2 ||
    Number.isNaN(action.position[0]) || Number.isNaN(action.position[1])
    ) return 'Position is invalid!'
  if(state.board.getIn(action.position)) {
    return 'The square is already taken!'
  }
  return null
}

