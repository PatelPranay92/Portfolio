import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';

export async function GET() {
  const data = getPortfolioData();
  return NextResponse.json({ resume: data.resume });
}

export async function PUT(request: NextRequest) {
  try {
    const { resume } = await request.json();
    const data = getPortfolioData();
    data.resume = resume;
    savePortfolioData(data);
    return NextResponse.json({ success: true, resume: data.resume });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }
}
