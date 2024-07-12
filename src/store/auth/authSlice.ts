import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authServices";
import { successToast, warningToast } from "../../utils/toasts";

interface UserData {
  token: string;
  name: string;
}

interface InitialStateProps {
  status: "idle" | "error" | "success" | "pending";
  data: UserData;
  isAuth: boolean;
}

const getUserFromLocalStorage = (): {
  data: UserData;
  isAuth: boolean;
} => {
  const userDataString = window.localStorage.getItem("user") || "";
  if (userDataString) {
    const user = JSON.parse(userDataString);
    const isAuth = user?.token ? true : false;
    return { data: user, isAuth };
  } else {
    return { data: { token: "", name: "" }, isAuth: false };
  }
};
const INITIAL_STATE: InitialStateProps = {
  status: "idle",
  data: getUserFromLocalStorage().data,
  isAuth: getUserFromLocalStorage().isAuth,
};

export const signIn = createAsyncThunk(
  "/signin",
  async (
    { username, password }: { username: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await authServices.login({ username, password });
      console.log(response);
      successToast(response.responseMessage);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      warningToast(error?.response?.data?.data);
      return thunkApi.rejectWithValue(error?.response?.data?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logOut: () => {
      window.localStorage.removeItem("user");
      return { ...INITIAL_STATE, isAuth: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuth = true;
        state.data = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;