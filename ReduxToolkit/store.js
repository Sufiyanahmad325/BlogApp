import { configureStore } from "@reduxjs/toolkit";
import blogSlice from '../ReduxToolkit/BlogRedux';

export const store = configureStore({
    reducer:{
        blogSlice:blogSlice
    }
})