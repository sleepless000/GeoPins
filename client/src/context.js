import { createContext } from 'react';

const Context = createContext({ currentUser: null, isAuth: false });

export { Context as default };
