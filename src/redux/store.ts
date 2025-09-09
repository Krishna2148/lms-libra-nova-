// // @ts-nocheck
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// const createRootReducer = (asyncReducers = {}) =>
//     combineReducers({
//         // auth: authSlice,

//         ...asyncReducers,
//     });

// export const store = configureStore({
//     reducer: createRootReducer(),
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             immutableCheck: false,
//             serializableCheck: false,
//         }).concat(

//         ),
//     devTools: true,
// });

// store.asyncReducers = {};

// export const useInjectReducer = (key, reducer) => {
//     if (!reducer) {
//         throw new Error("Invalid reducer.");
//     }
//     if (store.asyncReducers[key]) {
//         return;
//     }
//     store.asyncReducers[key] = reducer;
//     store.replaceReducer(createRootReducer(store.asyncReducers));
// };

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;