import { Map } from 'immutable';
import { createStore } from 'redux'

let ticTacToe = Map();

for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    ticTacToe = ticTacToe.setIn([i,j],'_');
  }
}

const initialState = {
  board: ticTacToe,
  turn: 'X'
}

//console.log(ticTacToe);

export default function reducer(state=initialState, action) {
  if(action.type === 'MOVE') {
    const nextTurn = state.turn === 'X' ? 'O' : 'X'
    return {
      board: ticTacToe.setIn(action.position, state.turn),
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




