import dbConnect from '@/lib/mongodb';
import User from '@/model/user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    
    const users = await User.find({}).select('-password');
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Failed to fetch users data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users data' },
      { status: 500 }
    );
  }
}
