export default function SkeletonLoader({ rows = 5 }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-slate-500">S.No</th>
            <th className="px-6 py-4 text-left text-slate-500">Name</th>
            <th className="px-6 py-4 text-left text-slate-500">Email</th>
            <th className="px-6 py-4 text-center text-slate-500">Action</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(rows)].map((_, index) => (
            <tr key={index} className="border-b border-slate-800">
              <td className="px-6 py-4">
                <div className="h-4 w-6 animate-pulse rounded bg-slate-700"></div>
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-700"></div>
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-56 animate-pulse rounded bg-slate-700"></div>
              </td>

              <td className="px-6 py-4 flex justify-center">
                <div className="h-8 w-20 animate-pulse rounded bg-slate-700"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}