import { NextResponse } from 'next/server'
import * as d1 from '@/lib/d1'


export async function GET() {
  const projects = await d1.getVisibleProjects()
  return NextResponse.json(projects)
}
