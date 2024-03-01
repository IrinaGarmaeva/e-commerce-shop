import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../../utils/localStorageActions";
import { IUser } from "../../../types";

interface IAuthState {
  userInfo: IUser | null;
}

const initialState: IAuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: IAuthState, action: PayloadAction<IUser>): void => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
