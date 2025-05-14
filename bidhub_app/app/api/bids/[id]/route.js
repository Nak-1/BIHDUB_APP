import dbConnect from '@/lib/mongodb';
import Auction from '@/model/auction';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const auctionId = parseInt(id);
    
    const auction = await Auction.findOne({ id: auctionId });
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(auction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch auction data' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const auctionId = parseInt(id);
    const updateData = await request.json();
    
    const auction = await Auction.findOneAndUpdate(
      { id: auctionId },
      { $set: updateData },
      { new: true }
    );
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Auction updated successfully', 
      auction
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update auction' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const auctionId = parseInt(id);
    
    const result = await Auction.findOneAndDelete({ id: auctionId });
    
    if (!result) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Auction deleted successfully'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete auction' },
      { status: 400 }
    );
  }
}
