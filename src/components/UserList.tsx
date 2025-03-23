import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchUsers, selectUsers } from "../store/usersSlice";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const status = useSelector((state: RootState) => state.users.status);

  const [page, setPage] = useState(1); // Página actual

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (status === "loading")
    return <p className="text-center text-gray-500">Cargando usuarios...</p>;

  if (users.length === 0) {
    return <p className="text-center text-gray-500">No hay más usuarios .</p>;
  }
  if (status === "failed")
    return (
      <p className="text-center text-red-500">Error al cargar usuarios.</p>
    );

  return (
    <div className="max-w-lg mx-auto mt-5 p-6 bg-white shadow-lg rounded-xl font-lexend">
      <h2 className="text-2xl font-bold text-center mb-6 text-light-blue">
        Lista de Usuarios
      </h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="py-4 flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <p className="text-sm text-gray-600 truncate">
                📍 {user.location}
              </p>
              <p className="text-sm text-gray-600 truncate">📞 {user.phone}</p>
              <p className="text-sm text-gray-600 truncate">
                🎂 {user.age} años
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-light-purple hover:bg-purple-700 text-white transition-colors"
          }`}
        >
          Atrás
        </button>

        <span className="text-lg font-medium text-gray-700">Página {page}</span>

        <button
          onClick={nextPage}
          className="px-4 py-2 rounded-lg bg-light-green hover:bg-green-700 text-white transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
