import { createContext } from 'react';

const Context = createContext({ currentUser: null, isAuth: null });

export { Context as default };
