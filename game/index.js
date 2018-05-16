import { Map } from 'immutable';
import { createStore } from 'redux'

//let ticTacToe = Map();

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

function streak(board,...coords){
  let coordStatus = {}
  for(let i = 0; i < coords.length; i++){
    let coord = board.getIn(coords[i]);
    if(coord === undefined)
      return
    if(Object.keys(coordStatus).includes(coord))
      coordStatus[coord] += 1;
    else
      coordStatus[coord] = 1
  }
  if(coordStatus['X'] === 3)
    return 'X'
  else if(coordStatus['O'] === 3)
    return 'O'
  else
    return
}

const initialState = {
  board: Map(),
  turn: 'X'
}

const turnReducer = (turn='X',action) => {
  if(action.type === 'MOVE') {
    return turn === 'X' ? 'O' : 'X'
  }
  return turn;
}

const boardReducer = (board=Map(), action) => {
  if(action.type === 'MOVE') {
    const newBoard = board.setIn(action.position, action.player);
    return newBoard
  }
  return board;
}

export default function reducer(state={}, action) {
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




