import { configureStore } from '@reduxjs/toolkit'
import optionsReducer from '../features/options/optionsSlice'
import  fieldReducer from  '../features/field/fieldSlice'

export default configureStore({
    reducer: {
        options: optionsReducer,
        field: fieldReducer,
    },
})