import { Map } from 'immutable';
import { createStore } from 'redux'

let ticTacToe = Map();

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
  board: ticTacToe,
  turn: 'X'
}

export default function reducer(state=initialState, action) {
  if(action.type === 'MOVE') {
    const nextTurn = state.turn === 'X' ? 'O' : 'X'
    const newBoard = state.board.setIn(action.position, state.turn);
    console.log(winner(newBoard));
    return {
      board: newBoard,
      turn: nextTurn
    }
  }
  return state
}

//ACTION TYPES
export const move = (player, position) => ({
  type: 'MOVE',
  position,
  player
})




