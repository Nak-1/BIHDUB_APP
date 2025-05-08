import dbConnect from '@/lib/mongodb';
import User from '@/model/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingUser = await User.findOne({
      $or: [
        { email: body.email },
        { username: body.username }
      ]
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }
    
    const highestIdUser = await User.findOne().sort('-id');
    const newId = highestIdUser ? highestIdUser.id + 1 : 1;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    
    const newUser = new User({
      ...body,
      id: newId,
      password: hashedPassword,
      joinDate: new Date()
    });
    
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    return NextResponse.json({ 
      message: 'User created successfully', 
      user: userResponse 
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 400 }
    );
  }
}