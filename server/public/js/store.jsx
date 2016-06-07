import { NEW_OFFER } from './actions.jsx';
import { createStore } from 'redux';
import socket from './socket.jsx';

//This is our reducer
let counter = function(state = {offers: []}, action){
  switch(action.type){
    case NEW_OFFER:
      let newOffers = state.offers;
      if (newOffers.length >= 50) {
        newOffers.shift();
      }

      return(
        Object.assign({},state,{
          offers:newOffers.concat([action.offer])
        })
      );
    default:
      return state;
  }
}

let store = createStore(counter);

export default store
