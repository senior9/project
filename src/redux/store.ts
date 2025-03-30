import {configureStore} from "@reduxjs/toolkit";
 import todoReducer from "./features/todoSlice";
import { baseAPi } from "./api/api";

 const  store = configureStore({
    reducer:{
      [baseAPi.reducerPath]:baseAPi.reducer,
        todo:todoReducer,
     },
   middleware:(getDefaultMiddlewares)=>
      getDefaultMiddlewares().concat(baseAPi.middleware),
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store




export default store;

