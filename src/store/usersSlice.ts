import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  phone: string;
  age: number;
}

interface UsersState {
  usersByPage: Record<number, User[]>; // Almacena usuarios por página
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  usersByPage: {},
  status: "idle",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const usersPerPage = 5;
    const response = await fetch(
      `https://randomuser.me/api/?results=${usersPerPage}&page=${page}`
    );
    const data = await response.json();

    return {
      page,
      users: data.results.map((user: any) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.medium,
        location: `${user.location.city}, ${user.location.country}`,
        phone: user.phone,
        age: user.dob.age,
      })),
    };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<{ page: number; users: User[] }>) => {
          state.status = "idle";
          state.usersByPage[action.payload.page] = action.payload.users;
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUsersByPage = (state: RootState, page: number) =>
  state.users.usersByPage[page] || [];

export default usersSlice.reducer;
