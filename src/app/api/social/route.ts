import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';

export async function GET() {
  const data = getPortfolioData();
  return NextResponse.json({ social: data.social });
}

export async function PUT(request: NextRequest) {
  try {
    const updatedSocial = await request.json();
    const data = getPortfolioData();
    data.social = { ...data.social, ...updatedSocial };
    savePortfolioData(data);
    return NextResponse.json({ success: true, social: data.social });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }
}
