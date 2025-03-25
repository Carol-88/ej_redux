import React from "react";
import { User } from "../types/userType";

type UserCardProps = {
  user: User;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li className="py-4 flex items-center space-x-4">
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
        <p className="text-sm text-gray-600 truncate">📍 {user.location}</p>
        <p className="text-sm text-gray-600 truncate">📞 {user.phone}</p>
        <p className="text-sm text-gray-600 truncate">🎂 {user.age} años</p>
      </div>
    </li>
  );
};
