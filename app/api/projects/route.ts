import { getProjects } from '@/lib/db';
import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}
