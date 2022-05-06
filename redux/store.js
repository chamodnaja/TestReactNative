
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import users from "Test1/redux/features/users";
const reducer = combineReducers({
    users
})
const store = configureStore({
  reducer,
})
export default store;
