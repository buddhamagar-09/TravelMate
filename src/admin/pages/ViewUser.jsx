import React from "react";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import SkeletonLoader from "../../components/Theme/SkeletonLoader";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/view-users");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    if (
      window.confirm("Are you sure you want to change the status of this user?")
    ) {
      try {
        const response = await api.patch(`/users/${id}/toggle-status`);
        console.log(response.data);
        fetchUsers();
      } catch (error) {
        console.log(error.response?.data);
      }
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

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr className="text-slate-300">
                <th className="px-6 py-4 text-left font-semibold">S.No</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
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
                    {user.status === "active" ? (
                      <span className="text-green-500 font-medium">Active</span>
                    ) : (
                      <span className="text-red-500 font-medium">Blocked</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-600 pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-blue-700 cursor-pointer">
                        View Details
                      </button>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.status === "active"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
