import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json({ projects: data.projects });
}

export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();
    const data = await getPortfolioData();
    data.projects.push(newProject);
    await savePortfolioData(data);
    return NextResponse.json({ success: true, projects: data.projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { index, project } = await request.json();
    const data = await getPortfolioData();
    if (index >= 0 && index < data.projects.length) {
      data.projects[index] = project;
      await savePortfolioData(data);
      return NextResponse.json({ success: true, projects: data.projects });
    }
    return NextResponse.json({ success: false, message: 'Invalid index' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const indexStr = searchParams.get('index');
    if (indexStr === null) {
      return NextResponse.json({ success: false, message: 'Index required' }, { status: 400 });
    }
    const index = parseInt(indexStr, 10);
    const data = await getPortfolioData();
    if (index >= 0 && index < data.projects.length) {
      data.projects.splice(index, 1);
      await savePortfolioData(data);
      return NextResponse.json({ success: true, projects: data.projects });
    }
    return NextResponse.json({ success: false, message: 'Invalid index' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
