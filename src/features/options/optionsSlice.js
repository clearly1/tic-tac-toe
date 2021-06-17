import {createSlice} from "@reduxjs/toolkit"

export const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        value: {
            mode: 'PvP',
            firstStep: 'Player',
            format: '3x3',
        }
    },
    reducers: {
        changeModeOption: (state, action) => {
            state.value.mode = action.payload
        },
        changeFirstStepOption: (state, action) => {
            state.value.firstStep = action.payload
        },
        changeFormatOption: (state, action) => {
            state.value.format = action.payload;
        },
    }
});

export const {changeModeOption, changeFormatOption, changeFirstStepOption} = optionsSlice.actions;

export const selectOptions = state => state.options.value;

export default optionsSlice.reducer