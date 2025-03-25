import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  phone: string;
  age: number;
};

type UsersState = {
  usersByPage: Record<number, User[]>;
  status: "idle" | "loading" | "failed";
};

const initialState: UsersState = {
  usersByPage: {},
  status: "idle",
};

const USERS_PER_PAGE = 5;

export const fetchUsers = createAsyncThunk<{ page: number; users: User[] }, number>(
  "users/fetchUsers",
  async (page) => {
    const response = await fetch(
      `https://randomuser.me/api/?results=${USERS_PER_PAGE}&page=${page}`
    );
    const data = await response.json();

    const users: User[] = data.results.map((user: { login: { uuid: string }; name: { first: string; last: string }; email: string; picture: { medium: string }; location: { city: string; country: string }; phone: string; dob: { age: number } }) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.medium,
      location: `${user.location.city}, ${user.location.country}`,
      phone: user.phone,
      age: user.dob.age,
    }));

    return { page, users };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ page: number; users: User[] }>) => {
        state.status = "idle";
        state.usersByPage[action.payload.page] = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUsersByPage = (state: RootState, page: number): User[] => state.users.usersByPage[page] || [];

export default usersSlice.reducer;
