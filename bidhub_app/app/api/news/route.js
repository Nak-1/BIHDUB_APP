import dbConnect from '@/lib/mongodb';
import News from '@/model/news';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    let query = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    let newsItems;
    let total;
    
    if (featured === 'true') {
      newsItems = await News.findFeatured(limit);
      total = await News.countDocuments({ isPublished: true, featuredOrder: { $gt: 0 } });
    } else {
      newsItems = await News.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      
      total = await News.countDocuments(query);
    }
    
    return NextResponse.json({
      news: newsItems,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingNews = await News.findOne({
      title: body.title
    });
    
    if (existingNews) {
      return NextResponse.json(
        { error: 'News with this title already exists' },
        { status: 400 }
      );
    }
    
    const highestIdNews = await News.findOne().sort('-id');
    const newId = highestIdNews ? highestIdNews.id + 1 : 1;
    
    // Create new news item
    const newNews = new News({
      ...body,
      id: newId,
      date: body.date || new Date()
    });
    
    await newNews.save();
    
    return NextResponse.json({ 
      message: 'News added successfully', 
      news: newNews 
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to add news:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add news' },
      { status: 400 }
    );
  }
}