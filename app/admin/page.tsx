import Link from "next/link";
import { getProjects } from "@/lib/db";
import { Plus, FolderKanban, CheckCircle2, HardHat, Clock } from "lucide-react";
import ProjectsTable from "./_ProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await getProjects();

  const total = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const ongoing = projects.filter((p) => p.status === "ongoing").length;
  const pipeline = projects.filter((p) => p.status === "pipeline").length;

  const stats = [
    { label: "Total Projects", value: total, icon: FolderKanban, color: "text-navy", bg: "bg-navy/5" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Under Construction", value: ongoing, icon: HardHat, color: "text-amber", bg: "bg-amber/10" },
    { label: "Upcoming", value: pipeline, icon: Clock, color: "text-sky-600", bg: "bg-sky-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Projects</h1>
          <p className="text-sm text-navy/50 mt-0.5">Manage your portfolio of construction projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-navy-dark transition hover:bg-amber-light"
        >
          <Plus className="h-4 w-4" /> Add New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white border border-black/8 shadow-sm p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} mb-3`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-navy/50 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <ProjectsTable projects={projects} />
    </div>
  );
}
