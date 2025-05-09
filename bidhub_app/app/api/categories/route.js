import dbConnect from '@/lib/mongodb';
import Category from '@/model/category';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    
    const categories = await Category.find({}).sort('name');
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Failed to fetch categories data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingCategory = await Category.findOne({
      $or: [
        { name: body.name },
        { slug: body.slug }
      ]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    
    const highestIdCategory = await Category.findOne().sort('-id');
    const newId = highestIdCategory ? highestIdCategory.id + 1 : 1;
    
    const newCategory = new Category({
      ...body,
      id: newId
    });
    
    await newCategory.save();
    
    return NextResponse.json({ 
      message: 'Category added successfully', 
      category: newCategory 
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to add category:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add category' },
      { status: 400 }
    );
  }
}
