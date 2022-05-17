import { useReducer, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// initial state
const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  userInfor: null,
};

// create context
export const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
