import React from 'react';

export default function Footer() {
  return (
    <footer className="h-16 border-t border-slate-800 bg-slate-900 px-6 flex items-center justify-between text-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 text-slate-400">
        <span className="font-bold text-white">TravelMate</span>
        <span>© 2026 All rights reserved.</span>
      </div>

      {/* Right side */}
      <div className="hidden sm:flex items-center gap-2 text-slate-400">
        <span>Powered by</span>
        <span className="font-semibold text-blue-400">TravelMate Admin</span>
      </div>
    </footer>
  );
}