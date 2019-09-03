import { ADD_MESSAGE, RECEIVE_MESSAGES, SET_NICKNAME, REMOVE_NICKNAME } from '../actions';

const initialState = {
  nickname: '',
  messages: [],
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      console.log('action.payload', action.payload);
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload
      };
    case REMOVE_NICKNAME:
      return {
        ...state,
        nickname: ''
      };
    default:
      return state;
  }
}

export default appReducer;