import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoginToken: "",
  userData: {},
  appliedJob : {},
  jobs: [],
  users: [],
  assignments: [],
  updatedData: "",
  myResume: "",
  myProfile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    headline: "",
    intro: "",
  },

  jobApplications: [{}],
};

export const Reducer = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAppliedJob: (state, action) => {
      state.appliedJob = action.payload;
    },
    setUserResume: (state, action) => {
      state.myResume = action.payload;
    },
    setUserUpdatedData: (state, action) => {
      state.updatedData = action.payload;
    },
    setUserLoginToken: (state, action) => {
      state.userLoginToken = action.payload;
    },
    addJob: (state, action) => {
      const obj = JSON.parse(action.payload);
      const job = {
        id: Math.random() * 100,
        title: obj.title,
        description: obj.description,
        evaluations: obj.evaluations,
      };
      state.jobs.push(job);
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    updateJob: (state, action) => {
      const obj = JSON.parse(action.payload);
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      state.jobs.map((item) => {
        if (item.id == obj.id) {
          (item.title = obj.title),
            (item.description = obj.description),
            (item.evaluations = obj.evaluations);
        }
      });
    },
    updateMyProfile: (state, action) => {
      const obj = JSON.parse(action.payload);
      state.myProfile.firstName = action.payload.firstName;
    },
    adduser: (state, action) => {
      const obj = JSON.parse(action.payload);

      const user = {
        id: Math.random() * 100,
        firstName: obj.firstName,
        lastName: obj.lastName,
        password: obj.password,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        idAdmin: false,
        resume: "",
      };
      state.users.push(user);
    },
    removeuser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const obj = JSON.parse(action.payload);
      state.users.map((item) => {
        if (item.id == obj.id) {
          (item.firstName = obj.firstName),
            (item.lastName = obj.lastName),
            (item.password = obj.password),
            (item.email = obj.email),
            (item.phoneNumber = obj.phoneNumber);
        }
      });
    },
    uploadResume: (state, action) => {
      state.users.map((item) => {
        if (item.id == action.payload.id) {
          item.resume = action.payload.resume;
        }
      });
    },
    updateUserStatus: (state, action) => {
      state.users.map((item) => {
        if (item.id == action.payload.id) {
          item.is_admin = action.payload.status;
        }
      });
    },
    addAssignment: (state, action) => {
      const obj = JSON.parse(action.payload);
      const assignment = {
        id: Math.random() * 100,
        title: obj.title,
        description: obj.description,
        testCases: obj.testCases,
        language: obj.language,
      };
      state.assignments.push(assignment);
    },
    removeAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      const obj = JSON.parse(action.payload);
      state.assignments.map((item) => {
        if (item.id == obj.id) {
          (item.title = obj.title),
            (item.description = obj.description),
            (item.testCases = obj.testCases);
          item.language = obj.language;
        }
      });
    },
  },
});

export const {
  setUserUpdatedData,
  setUserData,
  addJob,
  removeJob,
  updateJob,
  setUserLoginToken,
  adduser,
  removeuser,
  updateUser,
  addAssignment,
  removeAssignment,
  updateAssignment,
  setUserResume,
  updateMyProfile,
  updateUserStatus,
  uploadResume,
  setAppliedJob
} = Reducer.actions;

export default Reducer.reducer;
