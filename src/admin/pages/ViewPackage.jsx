import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import api from "../../api/axios";
import SkeletonLoader from "../../components/Hook/SkeletonLoader";
import { toast } from "react-hot-toast";

export default function ViewPackage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await api.get("/adminpackages");
      console.log(response.data);
      setPackages(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  //handle edit package
  const handleEdit = (id) => {
    navigate(`/admin/edit-package/${id}`);
  };

  //function to toggle package status
  const togglestatus = async (id) => {
    if (!window.confirm("Are you sure you want to toggle this package's status?")) {
      return;
    }
    try{
      const response = await api.put(`/packages/${id}/toggle-status`);
      toast.success("Package status updated successfully!");
      console.log(response.data);
    }
    catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update package status.");
    }
    fetchPackages(); 
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">View Packages</h1>

          <p className="text-sm text-slate-400">
            Manage all your travel packages.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

          <input
            type="text"
            placeholder="Search package..."
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
                <th className="px-6 py-4 text-left font-semibold">Image</th>
                <th className="px-6 py-4 text-left font-semibold">Package</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Duration</th>
                <th className="px-6 py-4 text-left font-semibold">Location</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Difficulty
                </th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={`http://127.0.0.1:8000/storage/${pkg.featured_image}`}
                      alt={pkg.title}
                      className="h-12 w-16 rounded-md object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-white">
                    {pkg.title}
                  </td>

                  <td className="px-6 py-4 text-slate-300">${pkg.price}</td>

                  <td className="px-6 py-4 text-slate-300">{pkg.duration}</td>

                  <td className="px-6 py-4 text-slate-300">{pkg.location}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                      {pkg.difficulty}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(pkg.id)}
                        className=" bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        onClick={() => togglestatus(pkg.id)}
                        className={`${pkg.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} p-2 rounded text-white cursor-pointer`}
                      >
                       {pkg.status === 'active' ? 'Block' : 'Unblock'}
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

