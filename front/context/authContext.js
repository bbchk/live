import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext({
  products: null,
});

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        user: null,
      };
    case "ADD_LIKED_PRODUCT":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "SIGN_IN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
