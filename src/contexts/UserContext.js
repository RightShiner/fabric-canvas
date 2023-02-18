/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "utils/Firebase";

// as the actual value you want to access.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const initalState = {
  currentUser: null,
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null)
  const [{ currentUser }, dispatch] = useReducer(userReducer, initalState);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       await createUserDocumentFromAuth(user);
  //     }
  //     setCurrentUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
