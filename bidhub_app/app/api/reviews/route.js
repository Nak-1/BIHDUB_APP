import reviewsData from '@/data/reviews.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(reviewsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Review submitted successfully', 
      review: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 400 }
    );
  }
}
