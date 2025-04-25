import auctionData from '@/data/auctions.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(auctionData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch auction data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Bid received successfully', 
      bid: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process bid' },
      { status: 400 }
    );
  }
}
