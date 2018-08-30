import { createStore } from 'redux'

import rootReducer from './reducers'

export default (initialState) => {
  let store = createStore(rootReducer, initialState);
  return store;
}
