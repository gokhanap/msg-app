import { AsyncStorage } from 'react-native';
import { makeId } from '../utils';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const SET_NICKNAME = 'SET_NICKNAME';
export const REMOVE_NICKNAME = 'REMOVE_NICKNAME';


export const addMessage = (message, nickname) => {
  console.log(message, nickname);
  return {
    type: ADD_MESSAGE,
    payload: {
      id: makeId(),
      text: message,
      timestamp: Date.now(),
      user: {
        name: nickname,
      }, 
    }
  }
};

export const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    payload: messages
  }
};

export const fetchMessagesAsync = () => dispatch => (
  fetch('https://jsonblob.com/api/jsonBlob/4f421a10-5c4d-11e9-8840-0b16defc864d')
  .then(res => res.json())
  .then(messages => dispatch(receiveMessages(messages)))
  .catch(error => console.log(error))
);

export const fetchUserAsync = () => dispatch => (
  AsyncStorage.getItem('nickname')
  .then(nickname => nickname && dispatch(setNickname(nickname)))
  .catch(error => console.log(error))
);

export const loginAsync = nickname => dispatch => (
  AsyncStorage.setItem('nickname', nickname)
  .then(() => dispatch(setNickname(nickname)))
  .catch(error => console.log(error))
);

export const logoutAsync = () => dispatch => (
  AsyncStorage.clear()
  .then(res => console.log('CLEAR', res))
  .then(() => dispatch(removeNickname()))
  .catch(error => console.log(error))
);

export const setNickname = nickname => {
  return {
    type: SET_NICKNAME,
    payload: nickname
  }
};

export const removeNickname = () => {
  return {
    type: REMOVE_NICKNAME,
  }
};