import React from "react";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";

export default function ViewUser() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/view-users");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const response = await api.delete(`/users/${id}`);
      console.log(response.data);
      fetchUsers();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">View Users</h1>

          <p className="text-sm text-slate-400">Manage your users.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

          <input
            type="text"
            placeholder="Search user..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr className="text-slate-300">
              <th className="px-6 py-4 text-left font-semibold">S.No</th>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              {/* <th className="px-6 py-4 text-left font-semibold">Role</th> */}
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-white">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-slate-300">{user.email}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className=" bg-red-600 p-2 hover:bg-red-700 cursor-pointer"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
