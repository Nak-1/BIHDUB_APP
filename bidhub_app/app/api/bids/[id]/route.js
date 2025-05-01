import auctionsData from '@/data/auctions.json';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    
    const { id } = await params;
    const bidId = parseInt(id);
    
    let targetBid = null;
    let auctionInfo = null;
    
    for (const auction of auctionsData.auctions) {
      for (const bid of auction.bidHistory) {
        console.log(bid.userId, bidId);
        
        if (bid.userId === bidId) {
          targetBid = bid;
          auctionInfo = {
            id: auction.id,
            title: auction.title
          };
          break;
        }
      }
      if (targetBid) break;
    }
    
    if (!targetBid) {
      return NextResponse.json(
        { error: 'Bid not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      bid: targetBid,
      auction: auctionInfo
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bid data' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const bidId = parseInt(id);
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Bid updated successfully', 
      bid: { id: bidId, ...body } 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update bid' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const bidId = parseInt(id);
    
    return NextResponse.json({ 
        message: 'Bid deleted successfully'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete bid' },
      { status: 400 }
    );
  }
}
