/** Actions.jsx */

export const NEW_OFFER = 'NEW_OFFER'

export const OPEN_SOCKET = 'OPEN_SOCKET'
export const CLOSE_SOCKET = 'CLOSE_SOCKET'

export function newOffer(offer){
  return {
    type:NEW_OFFER,
    offer: offer
  }
}

export function openSocket(){
  return {
    type: OPEN_SOCKET,
  }
}

export function closeSocket(){
  return {
    type: CLOSE_SOCKET
  }
}
