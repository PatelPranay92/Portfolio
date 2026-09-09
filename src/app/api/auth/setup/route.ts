import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET(request: NextRequest) {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: 'No ADMIN_EMAIL or ADMIN_PASSWORD in .env' }, { status: 400 });
    }

    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Admin user already exists in the database' });
    }

    // Hash the password and create the user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const newUser = new User({
      email: ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
    });

    await newUser.save();

    return NextResponse.json({ success: true, message: 'Admin user successfully created in the database!' });
  } catch (error: any) {
    console.error('Setup Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to setup admin user', error: error.message }, { status: 500 });
  }
}
