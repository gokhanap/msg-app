import { AsyncStorage } from 'react-native';
import { makeId } from '../utils';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';


export const addMessage = (message, user) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      id: makeId(),
      text: message,
      timestamp: Date.now(),
      user
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
  AsyncStorage.getItem('user')
  .then(user => user && dispatch(addUser(JSON.parse(user))))
  .catch(error => console.log(error))
);

export const loginAsync = user => dispatch => (
  AsyncStorage.setItem('user', JSON.stringify(user))
  .then(() => dispatch(addUser(user)))
  .catch(error => console.log(error))
);

export const logoutAsync = () => dispatch => (
  AsyncStorage.clear()
  .then(() => dispatch(removeUser()))
  .catch(error => console.log(error))
);

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: user
  }
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
};