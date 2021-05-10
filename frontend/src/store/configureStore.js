import {users} from "./reducers/users";
import {messages} from "./reducers/messages";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

const saveToLocalStorage = state => {

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('chatUser', serializedState);
  } catch {
    console.log('Could not save to local storage');
  }
};
const loadFromLocalStorage = () => {

  try {
    const serializedState = localStorage.getItem('chatUser');
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

const rootReducer = combineReducers({
  activeUsers: users,
  messages: messages,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(thunk));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, enhancer);

store.subscribe(()=>{
  saveToLocalStorage({
    activeUsers: store.getState().activeUsers
  });
});

export default store;