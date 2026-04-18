import API from "./Api";
import { createAsyncThunk } from "@reduxjs/toolkit";



// =========================== register Api calls =====================

export const register = createAsyncThunk(
  "admin/register",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/register", data);
      return res.data;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


// =========================== login Api calls =====================

export const login = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("user/login", data);
      return res.data; 
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// =========================== logout Api calls =====================

export const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const res = await API.post("user/logout");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// =========================== fetch profile Api calls =====================

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("user/current-user");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// ==========================  fetch dashboad data ======================
export const fetchDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/dashboard");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);

//   ========================  fetch all notes =================

export const fetchNotes = createAsyncThunk(
  "user/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/note");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes"
      );
    }
  }
);

//   ========================  create note =================

export const createNote = createAsyncThunk(
  "user/createNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/note", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create note"
      );
    }
  }
);  

//  ==================== updated notes =================

export const updateNote = createAsyncThunk(
  "user/updateNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/note/${data.id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update note"
      );
    }
  }
);

//  ==================== delete note (soft delete) =================

export const deleteNote = createAsyncThunk(
  "user/deleteNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.delete(`/note/${data.id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete note"
      );
    }
  }
);

// ==================== permanent delete note =================

export const permanentDeleteNote = createAsyncThunk(
  "user/permanentDeleteNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.delete(`/note/permanent/${data.id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to permanently delete note"
      );
    }
  }
);

//  ===================== toggle pin ======================

export const pinNote = createAsyncThunk(
  "user/pinNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/note/pin/${data.id}`);
      console.log("res.data.data",res.data.data)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to toggle pin"
      );
    }
  }
);

//  ===================== restore note =====================

export const restoreNote = createAsyncThunk(
  "user/restoreNote",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(`/note/restore/${data.id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to restore note"
      );
    }
  }
);

//  ===================== fetch trash notes =====================

export const fetchTrashNotes = createAsyncThunk(
  "user/fetchTrashNotes",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/note/trash");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch trash notes"
      );
    }
  }
);

//  ===================== fetch pin notes =====================

export const fetchPinNotes = createAsyncThunk(
  "user/fetchPinNotes",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/note/pin");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch pin notes"
      );
    }
  }
);

