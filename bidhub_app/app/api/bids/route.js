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
    
    const auctionData = await request.json();
    
    const missingFields = [];
    if (!auctionData.title) missingFields.push('title');
    if (!auctionData.description) missingFields.push('description');
    if (!auctionData.startingPrice && !auctionData.startPrice) missingFields.push('startingPrice/startPrice');
    if (!auctionData.startDate) missingFields.push('startDate');
    if (!auctionData.endDate) missingFields.push('endDate');
    if (!auctionData.image) missingFields.push('image');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const newAuction = new Auction({
      id: auctionData.id || Date.now(),
      title: auctionData.title,
      description: auctionData.description,
      startingPrice: auctionData.startingPrice || auctionData.startPrice,
      price: auctionData.price || auctionData.startingPrice || auctionData.startPrice,
      startDate: auctionData.startDate,
      endDate: auctionData.endDate,
      image: auctionData.image,
      author: auctionData.author || "Anonymous",
      bids: auctionData.bids || []
    });
    
    await newAuction.save();
    
    return NextResponse.json({ 
      message: 'Auction created successfully', 
      auction: newAuction
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create auction:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create auction' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    
    const { auctionId, userId, amount } = await request.json();
    
    if (!auctionId || !userId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: auctionId, userId, or amount' },
        { status: 400 }
      );
    }
    
    const auction = await Auction.findOne({ id: auctionId });
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    if (!auction.isActive()) {
      return NextResponse.json(
        { error: 'Auction has ended' },
        { status: 400 }
      );
    }
    
    try {
      auction.placeBid(userId, amount);
      await auction.save();
      
      return NextResponse.json({
        message: 'Bid placed successfully',
        currentPrice: auction.price,
        bidCount: auction.currentBids
      }, { status: 201 });
    } catch (bidError) {
      return NextResponse.json(
        { error: bidError.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    return NextResponse.json(
      { error: 'Failed to place bid' },
      { status: 500 }
    );
  }
}