import categoriesData from '@/data/categories.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(categoriesData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Category added successfully', 
      category: body 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add category' },
      { status: 400 }
    );
  }
}
