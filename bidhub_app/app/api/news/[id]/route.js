import dbConnect from '@/lib/mongodb';
import News from '@/model/news';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    let newsItem;
    
    if (/^\d+$/.test(id)) {
      const newsId = parseInt(id);
      newsItem = await News.findOne({ id: newsId, isPublished: true });
    } else {
      newsItem = await News.findBySlug(id);
    }
    
    if (!newsItem) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    
    await newsItem.incrementViewCount();
    
    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const newsId = parseInt(id);
    const body = await request.json();
    
    delete body.id;
    
    const updatedNews = await News.findOneAndUpdate(
      { id: newsId },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'News updated successfully', 
      news: updatedNews 
    });
  } catch (error) {
    console.error('Failed to update news:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update news' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const newsId = parseInt(id);
    
    const unpublishedNews = await News.findOneAndUpdate(
      { id: newsId },
      { $set: { isPublished: false } },
      { new: true }
    );
    
    if (!unpublishedNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'News deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 400 }
    );
  }
}
