export default function BookingSkeleton({ count = 3 }) {
  return (
    <div className="space-y-5">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="h-56 w-full shrink-0 animate-pulse bg-[#DCE7DE] md:h-auto md:w-64" />

            {/* Main content */}
            <div className="flex-1">
              {/* Package header */}
              <div className="flex flex-col gap-3 border-b border-[#E4EDE6] dark:border-[#DDE7DF] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="h-3 w-24 animate-pulse bg-[#DCE7DE]" />
                  <div className="mt-2 h-5 w-48 animate-pulse bg-[#DCE7DE]" />
                </div>

                <div className="h-6 w-20 shrink-0 animate-pulse bg-[#DCE7DE]" />
              </div>

              {/* Booking details */}
              <div className="grid grid-cols-2 gap-y-5 px-6 py-5 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-16 animate-pulse bg-[#DCE7DE]" />
                    <div className="mt-2 h-4 w-24 animate-pulse bg-[#DCE7DE]" />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4EDE6] dark:border-[#DDE7DF] px-6 py-4">
                <div className="h-4 w-28 animate-pulse bg-[#DCE7DE]" />

                <div className="flex gap-3">
                  <div className="h-10 w-24 animate-pulse bg-[#DCE7DE]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
