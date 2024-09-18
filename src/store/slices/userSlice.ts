import { createSlice } from '@reduxjs/toolkit';

import { DrawingResponse, FilesResponse, ProjectResponse, ReportsResponse, Users, drawingDetails } from '../../models/account';

export interface UsersInterface {
  user: Users;
  isLoggedIn: boolean;
  project: ProjectResponse;
  files: FilesResponse;
  reports: ReportsResponse[];
  reportDetails: ReportsResponse;
  drawings: DrawingResponse | null;
  drawingDetails: drawingDetails | {};
  drawingIssueFiles: any;
}

const initialState: UsersInterface = {
  user: {},
  isLoggedIn: false,
  project: {},
  files: {},
  reports: [],
  reportDetails: {},
  drawings: null,
  drawingDetails: {},
  drawingIssueFiles: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state: UsersInterface, action) {
      const newUser = { ...state.user, ...action.payload };
      state.user = newUser;
    },
    setIsLoggedIn(state: UsersInterface, action) {
      state.isLoggedIn = action.payload;
    },
    updateProject(state: UsersInterface, action) {
      state.project = action.payload;
    },
    updateFiles(state: UsersInterface, action) {
      state.files = action.payload;
    },
    updateReports(state: UsersInterface, action) {
      state.reports = action.payload;
    },
    updateReportDetails(state: UsersInterface, action) {
      state.reportDetails = action.payload;
    },
    updateDrawings(state: UsersInterface, action) {
      state.drawings = action.payload;
    },
    updateDrawingsDetails(state: UsersInterface, action) {
      state.drawingDetails = action.payload;
    },
    setDrawingIssueFiles(state: UsersInterface, action) {
      state.drawingIssueFiles = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});


export const { 
  updateDrawings,
  updateUser, 
  setIsLoggedIn, 
  updateProject, 
  updateFiles, 
  updateReports, 
  updateReportDetails, 
  updateDrawingsDetails, 
  clearUser, 
  setDrawingIssueFiles 
} = userSlice.actions;

export default userSlice.reducer;
