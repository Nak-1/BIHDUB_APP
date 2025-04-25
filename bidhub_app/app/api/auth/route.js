import userData from '@/data/users.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'User registration received successfully', 
      user: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process user registration' },
      { status: 400 }
    );
  }
}
