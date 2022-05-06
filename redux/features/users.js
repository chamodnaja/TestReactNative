import { createSlice } from '@reduxjs/toolkit'
import RandomID from 'Test1/functions/RandomID';

export const users = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    add: (state, action) => {
        const item = {
            ...action.payload,
            uid: RandomID(8)
        }
        state.users.push(item)
    },
    edit: (state, action) => {
        const nextState = state.users.map((val)=>{
            if(val.uid !== action.payload.uid) return val;
            return {
                ...action.payload.data,
                uid: action.payload.uid
            };
        })
        state.users = nextState;
    },
    remove: (state, action) => {
        const nextState = state.users.filter((val)=>{
            if(val.uid !== action.payload.uid) return val;
        })
        console.log("nextState",nextState)
        state.users = nextState;
    },
  }
})

// Action creators are generated for each case reducer function
export const { add, edit, remove } = users.actions

export default users.reducer

