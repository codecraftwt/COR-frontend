import { createSlice } from '@reduxjs/toolkit';

const draftsSlice = createSlice({
  name: 'drafts',
  initialState: {
    userDrafts: {}
  },
  reducers: {
    addDraft: (state, action) => {
      const { userEmail, draft } = action.payload;
      if (!state.userDrafts[userEmail]) {
        state.userDrafts[userEmail] = [];
      }
      state.userDrafts[userEmail].push(draft);
    },
    setDraftsForUser: (state, action) => {
      const { userEmail, drafts } = action.payload;
      state.userDrafts[userEmail] = drafts;
    },
    clearDraftsForUser: (state, action) => {
      const { userEmail } = action.payload;
      state.userDrafts[userEmail] = [];
    }
  }
});

export const { addDraft, setDraftsForUser, clearDraftsForUser } = draftsSlice.actions;

export const selectDraftsByUser = (state, userEmail) =>
  state.drafts.userDrafts[userEmail] || [];

export default draftsSlice.reducer;
