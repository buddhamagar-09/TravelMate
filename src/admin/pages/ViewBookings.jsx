import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import api from "../../api/axios";
import SkeletonLoader from "../../components/Hook/SkeletonLoader";
import { toast } from "react-hot-toast";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get("/bookings");

      console.log(response.data);
      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  //handle edit package
  //   const handleEdit = (id) => {
  //     navigate(`/admin/edit-package/${id}`);
  //   };

  //function to toggle package status
  const updateStatus = async (id, status) => {
    try {
      const response = await api.patch(`/bookings/${id}/update-status`, {
        status,
      });
      toast.success(`Booking ${status} successfully!`);
      console.log(response.data);

      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking status.");
      console.log(error.response?.data);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">View Bookings</h1>

          <p className="text-sm text-slate-400">
            Manage all your travel bookings.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

          <input
            type="text"
            placeholder="Search booking..."
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
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  S.No
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Package
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Phone
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Date
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Travelers
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Payment_Status
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {booking.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.package.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.phone_number}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {new Date(booking.travel_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {booking.travelers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    ${booking.total_price}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.payment_status === "paid" && (
                      <span className="inline-flex items-center gap-2 border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                        Paid
                      </span>
                    )}

                    {booking.payment_status === "pending" && (
                      <span className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                        Pending
                      </span>
                    )}

                    {booking.payment_status === "failed" && (
                      <span className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                        Failed
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.status === "pending" && (
                      <span className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                        Pending
                      </span>
                    )}

                    {booking.status === "confirmed" && (
                      <span className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                        Confirmed
                      </span>
                    )}

                    {booking.status === "cancelled" && (
                      <span className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                        Cancelled
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(booking.id, "confirmed")
                            }
                            className="border cursor-pointer border-blue-500/40 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(booking.id, "cancelled")
                            }
                            className="border cursor-pointer border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {booking.status === "confirmed" && (
                        <span className="text-xs text-slate-500">
                          No action
                        </span>
                      )}

                      {booking.status === "cancelled" && (
                        <span className="text-xs text-slate-500">
                          No action
                        </span>
                      )}
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
