import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchUsers,
  selectCurrentPage,
  selectUsersByPage,
  setPage,
} from "../store/usersSlice";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectCurrentPage);
  const users = useSelector((state: RootState) =>
    selectUsersByPage(state, page)
  );
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers(page));
    }
  }, [dispatch, page, users.length]);

  const nextPage = () => dispatch(setPage(page + 1));
  const prevPage = () => dispatch(setPage(Math.max(page - 1, 1)));

  return (
    <div className="max-w-lg mx-auto mt-5 p-6 bg-white shadow-lg rounded-xl font-lexend">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
        Lista de Usuarios
      </h2>

      {status === "loading" && users.length === 0 && (
        <p className="text-center text-gray-500">Cargando usuarios...</p>
      )}

      {!users.length && status !== "loading" && (
        <p className="text-center text-gray-500">No hay más usuarios.</p>
      )}

      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-400 hover:bg-purple-700 text-white"
          }`}
        >
          Atrás
        </button>

        <span className="text-lg font-medium text-gray-700">Página {page}</span>

        <button
          onClick={nextPage}
          className="px-4 py-2 rounded-lg bg-green-400 text-white hover:bg-green-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
