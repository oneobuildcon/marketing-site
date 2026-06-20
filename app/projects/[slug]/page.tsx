import { getProject } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./_client";

export const revalidate = 60;

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();
  return <ProjectDetailClient project={project} />;
}
