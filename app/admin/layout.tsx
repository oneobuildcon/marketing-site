import Link from "next/link";
import { headers } from "next/headers";
import { LayoutDashboard, Building2, Package, Users, BarChart3 } from "lucide-react";
import LogoutButton from "./_LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") || "";
  // The login page renders its own full-screen layout, no admin shell.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar (md+) / top bar (mobile) */}
      <aside className="flex flex-col bg-navy text-white md:h-screen md:w-64 md:sticky md:top-0">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber/20">
              <Building2 className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">One O Buildcon</p>
              <p className="text-xs text-amber-light">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4 text-amber" /> Projects
          </Link>
          <Link
            href="/admin/packages"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Package className="h-4 w-4 text-amber" /> Packages
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Users className="h-4 w-4 text-amber" /> Leads
          </Link>
          <Link
            href="/admin/stats"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <BarChart3 className="h-4 w-4 text-amber" /> Homepage Stats
          </Link>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-5 sm:p-8">{children}</main>
    </div>
  );
}
