import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarVisible:true,
  dropdownVisible:false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
    toggleDropdown(state) {
      state.dropdownVisible = !state.dropdownVisible;
    },
  }
});

const themeReducer = themeSlice.reducer;

export const themeActions = themeSlice.actions;

export default themeReducer;
