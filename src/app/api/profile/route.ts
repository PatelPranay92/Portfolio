import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json({ profile: data.profile });
}

export async function PUT(request: Request) {
  try {
    const updatedProfile = await request.json();
    const data = await getPortfolioData();
    data.profile = { ...data.profile, ...updatedProfile };
    await savePortfolioData(data);
    return NextResponse.json({ success: true, profile: data.profile });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }
}
