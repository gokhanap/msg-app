import { ADD_MESSAGE, RECEIVE_MESSAGES, ADD_USER, REMOVE_USER } from '../actions';

const initialState = {
  user: {},
  messages: [],
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}

export default appReducer;