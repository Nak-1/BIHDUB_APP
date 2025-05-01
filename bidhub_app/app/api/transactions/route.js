import transactionsData from '@/data/transactions.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(transactionsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Transaction recorded successfully', 
      transaction: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record transaction' },
      { status: 400 }
    );
  }
}
