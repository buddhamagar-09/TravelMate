import React from 'react';

export default function Footer() {
  return (
    <footer className="h-16 border-t border-[#DDE7DF] bg-[#FFFFFF] px-6 flex items-center justify-between text-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 text-slate-600">
        <span className="font-bold text-slate-900">TravelMate</span>
        <span>© 2026 All rights reserved.</span>
      </div>

      {/* Right side */}
      <div className="hidden sm:flex items-center gap-2 text-slate-600">
        <span>Powered by</span>
        <span className="font-semibold text-[#064E3B]">TravelMate Admin</span>
      </div>
    </footer>
  );
}