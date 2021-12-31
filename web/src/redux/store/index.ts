import { createStore, Store } from 'redux';
import { rootReducer } from "../reducers";


const store = createStore(rootReducer);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;