import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import api from "../../api/axios";
import SkeletonLoader from "../../components/Hook/SkeletonLoader";
import { toast } from "react-hot-toast";

// Small badge component — reuse colors everywhere
function CategoryBadge({ category }) {
  const styles = {
    trekking: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    tour: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    wildlife: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  };
  const label = {
    trekking: "Trekking",
    tour: "Tour",
    wildlife: "Wildlife",
  };

  return (
    <span
      className={`inline-flex items-center border px-3 py-1.5 text-xs font-medium ${
        styles[category] ?? "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {label[category] ?? category}
    </span>
  );
}

export default function ViewPackage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await api.get("/adminpackages");
      setPackages(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-package/${id}`);
  };

  const toggleStatus = async (id) => {
    if (!window.confirm("Are you sure you want to toggle this package's status?")) {
      return;
    }
    try {
      await api.put(`/packages/${id}/toggle-status`);
      toast.success("Package status updated successfully!");
      fetchPackages();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update package status.");
    }
  };

  // Client-side filter — search + category
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      categoryFilter === "all" || pkg.category === categoryFilter;

    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      pkg.title?.toLowerCase().includes(q) ||
      pkg.location?.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

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

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="trekking">Trekking</option>
            <option value="tour">Tour</option>
            <option value="wildlife">Wildlife</option>
          </select>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search package..."
              className="w-full rounded-md border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
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
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Duration</th>
                <th className="px-6 py-4 text-left font-semibold">Location</th>
                <th className="px-6 py-4 text-left font-semibold">Difficulty</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPackages.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No packages found.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
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

                    <td className="px-6 py-4">
                      <CategoryBadge category={pkg.category} />
                    </td>

                    <td className="px-6 py-4 text-slate-300">Rs. {pkg.price}</td>

                    <td className="px-6 py-4 text-slate-300">{pkg.duration} days</td>

                    <td className="px-6 py-4 text-slate-300">{pkg.location}</td>

                    <td className="px-6 py-4">
                      {pkg.difficulty ? (
                        <span className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                          {pkg.difficulty}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium ${
                          pkg.status === "active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                      >
                        {pkg.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(pkg.id)}
                          title="Edit package"
                          className="border cursor-pointer border-slate-700 bg-slate-800 p-2 text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          onClick={() => toggleStatus(pkg.id)}
                          className={`border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                            pkg.status === "active"
                              ? "border-red-500/40 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/15 hover:text-red-300"
                              : "border-blue-500/40 bg-blue-500/10 text-blue-400 hover:border-blue-500 hover:bg-blue-500/15 hover:text-blue-300"
                          }`}
                        >
                          {pkg.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}