// store.js
import { createStore } from 'redux';
import counterReducer from './reducers/counterReducer'; // Pastikan path dan nama file sesuai

const store = createStore(counterReducer);

export default store;
