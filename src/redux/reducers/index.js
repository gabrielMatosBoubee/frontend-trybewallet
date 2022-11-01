import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.

const rootReducers = combineReducers({ user });

// const reducer = (state = inicialState, action) => {
//   switch (action.type) {
//   case 'login':
//     return user;
//   case 'wallet':
//     return wallet;
//   default: return state;
//   }
// };

export default rootReducers;

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
