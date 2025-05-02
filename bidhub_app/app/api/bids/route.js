import dbConnect from '@/lib/mongodb';
import Auction from '@/model/auction';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    
    const auctions = await Auction.find({});
    
    return NextResponse.json({ auctions });
  } catch (error) {
    console.error('Failed to fetch auction data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auction data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { auctionId, userId, amount } = body;
    
    const auction = await Auction.findOne({ id: auctionId });
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    auction.placeBid(userId, amount);
    
    await auction.save();
    
    return NextResponse.json({ 
      message: 'Bid placed successfully', 
      bid: {
        auctionId,
        userId,
        amount,
        time: new Date()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to process bid:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process bid' },
      { status: 400 }
    );
  }
}
