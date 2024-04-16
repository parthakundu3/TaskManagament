'use client';
import apiService from "@/app/api/apiLists";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from 'js-cookie';



const initialState:any = [];

// export const createtask: any = createAsyncThunk(
//   "tasks/create",
//   async ({ title, description }) => {
//     const res = await apiService.create({ title, description });
//     return res.data;
//   }
// );

type RegisterPayload = {
  id: number; 
  emailInput: string;
  password: string;
  fullname: string;
};
type KnownError = {
  errorMessage : string;
}

export const createUser = createAsyncThunk<RegisterPayload,{}>('users/create', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiService.create(userData)
    //const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    return response.data;
  } catch (err) {
    const error: AxiosError<KnownError> = err as any; // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})
let accessToken='';
export const login = createAsyncThunk<any,any>('users/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiService.login(userData)
    console.log("Response data", response.data);
    accessToken = response.data.token;
    Cookies.set('accesstoken', response.data.token, { expires: 7, secure: true });
    
    //const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    //return response.data;
  } catch (err) {
    const error: AxiosError<KnownError> = err as any; // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})

// export const retrievetasks = createAsyncThunk(
//   "tasks/retrieve",
//   async () => {
//     const res = await taskDataService.getAll();
//     return res.data;
//   }
// );

// export const updatetask = createAsyncThunk(
//   "tasks/update",
//   async ({ id, data }) => {
//     const res = await taskDataService.update(id, data);
//     return res.data;
//   }
// );

// export const deletetask = createAsyncThunk(
//   "tasks/delete",
//   async ({ id }) => {
//     await taskDataService.remove(id);
//     return { id };
//   }
// );

// export const deleteAlltasks = createAsyncThunk(
//   "tasks/deleteAll",
//   async () => {
//     const res = await taskDataService.removeAll();
//     return res.data;
//   }
// );

// export const findtasksByTitle = createAsyncThunk(
//   "tasks/findByTitle",
//   async ({ title }) => {
//     const res = await taskDataService.findByTitle(title);
//     return res.data;
//   }
// );

// const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   extraReducers: {
//     [createtask.fulfilled]: (state: any[], action: { payload: any; }) => {
//       state.push(action.payload);
//     },
    // [retrievetasks.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
    // [updatetask.fulfilled]: (state, action) => {
    //   const index = state.findIndex(task => task.id === action.payload.id);
    //   state[index] = {
    //     ...state[index],
    //     ...action.payload,
    //   };
    // },
    // [deletetask.fulfilled]: (state, action) => {
    //   let index = state.findIndex(({ id }) => id === action.payload.id);
    //   state.splice(index, 1);
    // },
    // [deleteAlltasks.fulfilled]: (state, action) => {
    //   return [];
    // },
    // [findtasksByTitle.fulfilled]: (state, action) => {
    //   return [...action.payload];
    // },
//   },
// });

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(createUser.fulfilled, (state, action: { payload: any; }) => {
      //state.entities[payload.id] = payload
      state.push(action.payload);
    })
    builder.addCase(createUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(login.fulfilled, (state, action: { payload: any; }) => {
      //state.entities[payload.id] = payload
      state.push(action.payload);
    })
     builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message
      }
    })

  },
})

const { reducer } = taskSlice;
export default reducer;