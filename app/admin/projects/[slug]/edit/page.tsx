import { notFound } from "next/navigation";
import { getProject } from "@/lib/db";
import ProjectForm from "../../_ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();
  return <ProjectForm project={project} isNew={false} />;
}
