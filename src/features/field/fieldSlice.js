import {createSlice} from "@reduxjs/toolkit"

export const fieldSlice = createSlice({
    name: 'field',
    initialState: {
        value: {
            gameIsRunning: false,
        }
    },
    reducers: {
        changeGameIsRunningOption: (state) => {
            state.value.gameIsRunning = !state.value.gameIsRunning
        },
    }
});

export const {changeGameIsRunningOption} = fieldSlice.actions;

export const selectField = state => state.field.value;

export default fieldSlice.reducer