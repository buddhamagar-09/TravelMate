import React from "react";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import SkeletonLoader from "../../components/Hook/SkeletonLoader";
import { toast } from "react-hot-toast";

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
        toast.success("User status changed successfully!");
        fetchUsers();
      } catch (error) {
        console.log(error.response?.data);
        toast.error("Failed to change user status. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#F8E7C9] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">View Users</h1>

          <p className="text-sm text-slate-600">Manage your users.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-lg" />

          <input
            type="text"
            placeholder="Search user..."
            className="w-full rounded-md border border-[#D8C494] bg-[#F8E7C9] py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-500 focus:border-[#064E3B] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E4D2A8] bg-[#F8E7C9]">
          <table className="min-w-full text-sm">
            <thead className="border-b border-[#E4D2A8] transition hover:bg-[#F1E3C4]/60">
              <tr className="text-slate-700">
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
                  className="border-b border-[#E4D2A8] hover:bg-[#F1E3C4] transition"
                >
                  <td className="px-6 py-4 text-slate-600">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-slate-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium ${
                        user.status === "active"
                          ? "border-[#064E3B]/30 bg-[#064E3B]/10 text-[#064E3B]"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 ${
                          user.status === "active"
                            ? "bg-[#064E3B]"
                            : "bg-red-400"
                        }`}
                      ></span>

                      {user.status === "active" ? "Active" : "Blocked"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`border cursor-pointer px-3 py-1.5 text-xs font-medium transition ${
                          user.status === "active"
                            ? "border-red-500/40 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/15 hover:text-red-300"
                            : "border-[#064E3B]/40 bg-[#064E3B]/10 text-[#064E3B] hover:border-[#064E3B] hover:bg-[#04382A]/15 hover:text-[#064E3B]"
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
