import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Definimos el tipo de usuario
interface User {
  id: number;
  name: string;
    email: string;
    avatar: string;
    location: string;
    phone: string;
    age: number;
}

// Estado inicial
interface UsersState {
  users: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  status: "idle",
};

// Acción asíncrona para obtener usuarios desde la API
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const usersPerPage = 5;
    const response = await fetch(
      `https://randomuser.me/api/?results=${usersPerPage}&page=${page}`
    );
    const data = await response.json();

    return data.results.map((user: any) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.medium, // Foto de perfil
      location: `${user.location.city}, ${user.location.country}`, // Ciudad y país
      phone: user.phone, // Teléfono
      age: user.dob.age, // Edad
    }));
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
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Selector para obtener los usuarios desde el estado
export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;

// Creamos un estado global users con un array de usuarios.
// Definimos una acción fetchUsers para obtener los usuarios desde una API.
// Creamos el usersSlice que maneja la carga, éxito o error al obtener usuarios.
// Exportamos un selector para acceder a los usuarios desde los componentes.