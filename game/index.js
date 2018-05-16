import { Map } from 'immutable';
import { createStore } from 'redux'

let ticTacToe = Map();

function winner(){

}

function streak(board,...coords){
  let coordStatus = {}
  for(let i=0;i<coords.length;i++){
    let coord = board.getIn(coords[i]);
    if(coord === undefined)
      return
    if(Object.keys(coordStatus).includes(coord))
      coordStatus[coord] += 1;
    else
      coordStatus[coord] = 1
  }
  console.log(coordStatus);
  if(coordStatus['X'] === 3)
    return 'X'
  else if(coordStatus['O'] === 3)
    return 'O'
  else
    return
  // let coordStatus;
  // return coords.reduce((result,coord) => {
  //   console.log('Reduce ran', board.getIn(coord));
  //   if(!board.getIn(coord)) return
  //   coordStatus = boar
  // })
}

const initialState = {
  board: ticTacToe,
  turn: 'X'
}

//console.log(ticTacToe);

export default function reducer(state=initialState, action) {
  if(action.type === 'MOVE') {
    const nextTurn = state.turn === 'X' ? 'O' : 'X'
    const newBoard = state.board.setIn(action.position, state.turn);
    console.log(streak(newBoard,[0,0],[0,1],[0,2]));
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




