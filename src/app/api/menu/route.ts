import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Add validation and database logic here
    return NextResponse.json({ message: 'Menu item added successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}
