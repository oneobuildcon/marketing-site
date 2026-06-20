import { getProjects } from "@/lib/db";
import ProjectsClient from "./_client";

export const revalidate = 60;

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
