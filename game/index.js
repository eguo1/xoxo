const {Map} = require('immutable');

let ticTacToe = Map();

for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    ticTacToe = ticTacToe.setIn([i,j],'_');
  }
}

//console.log(ticTacToe);

export default function reducer(state, action) {
  // TODO
  return state
}

//ACTION TYPES
const Move = (position, player) => ({
  type: 'MOVE',
  position,
  player
})




