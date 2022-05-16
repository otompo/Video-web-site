import { useReducer, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// initial state
const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  userInfor: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SUCCESS':
      return { ...state, userInfor: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'REMOVE_USERINFO':
      return { ...state, userInfor: null };
    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('userInfor')),
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'UPDATE',
      payload: JSON.parse(window.localStorage.getItem('userInfor')),
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
