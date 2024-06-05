import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL, withCredentials:true})


// LOGIN

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try { 
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/login`,
        { email: loginEmail, password: loginPassword },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SIGN UP
export const signUpMentor = createAsyncThunk(
  "mentor/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.post(`/v1/register/mentor`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// SIGN UP
export const updateMentorFinalInfo = createAsyncThunk(
  "mentor/update/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(`/v1/self/update/profile/info`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// update metor info 
export const updateMentorFinalInfoAfter = createAsyncThunk(
  "mentor/update/updateInfo/after",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(`/v1/self/update/profile/info/after`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Update
export const updateMentorInfo = createAsyncThunk(
  "mentor/update/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(`/v1/self/update/profile`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//LOAD USER

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/self`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// LOGOUT USER

export const logoutUser = createAsyncThunk(
    "/user/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post("/v1/logout");
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  //Mentor Detail

  export const getUserDetails = createAsyncThunk(
    "mentor/signleMentor",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/user/info/${id}`);
        return data.user;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  //Mentor Request Affirmation(Admin)
  export const updateRoleMentor = createAsyncThunk(
    "admin/request/decide",
    async ({id,role}, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.put(`/v1/admin/users/${id}`, {role}, config);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //All Students (Admin)
  export const getAllStudents = createAsyncThunk(
    "admin/request/all/students",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admin/students/all`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //All mentors (Admin)
  export const getAllMentors = createAsyncThunk(
    "admin/request/all/mentors",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admin/mentors/all`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //All admin (Admin)
  export const getAllAdmin = createAsyncThunk(
    "admin/all",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admins/all`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //delete user (Admin)
  export const deleteUser = createAsyncThunk(
    "admin/delete/user",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.delete(`/v1/admin/user/delete/${id}`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //connection  (Admin)
  export const getAllConnections = createAsyncThunk(
    "admin/all/connections",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/admin/all/connection`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //assign connection  (Admin)
  export const assignConnection = createAsyncThunk(
    "admin/connectionsAssign",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.put(`/v1/admin/edit/connection/${id}`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //connection  (Admin)
  export const resolveConnection = createAsyncThunk(
    "admin/connections/resolve",
    async ({id,sid}, { rejectWithValue }) => {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.put(`/v1/admin/remove/connections`, {id,sid}, config);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  //connection (mentor)
  export const allMentorConnection = createAsyncThunk(
    "mentor/connection/past",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/v1/mentor/all/connection`);
        return data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

  export const clearError = createAsyncThunk("user/clearError", async () => {
    return null;
  });
  export const clearMessage = createAsyncThunk("user/clearMssg", async () => {
    return null;
  });
  export const reset = createAsyncThunk("user/reset", async () => {
    return null;
  });