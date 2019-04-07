export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: payload
      };
    default:
      return state;
  }
}
