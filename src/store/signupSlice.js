import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  location: '',
  phone: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    signupData: {},
  },
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    resetSignupData(state) {
      Object.keys(state).forEach(key => {
        state[key] = initialState[key];
      });
    },
  },
});

export const { setSignupData, resetSignupData } = signupSlice.actions;
export default signupSlice.reducer;
