import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarVisible:true,
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
  }
});

const themeReducer = themeSlice.reducer;

export const themeActions = themeSlice.actions;

export default themeReducer;
// export default themeSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   colors: {
//     header: "#ebfbff",
//     body: "#fff",
//     footer: "#003333",
//   },
//   mobile: "768px",
//   darkmode: false,
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     setDarkTheme(state) {
//       state.colors.header = "#324B50";
//       state.colors.body = "#445155";
//       state.darkmode = true;
//     },
//     setDefaultTheme(state) {
//       state.colors.header = "#ebfbff";
//       state.colors.body = "#fff";
//       state.darkmode = false;
//     },
//   },
// });

// export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

// export default themeSlice.reducer;
