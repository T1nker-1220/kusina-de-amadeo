import { NextResponse } from 'next/server';
import { app } from '@/config/firebase';

export async function POST(request: Request) {
  try {
    const { token, title, body } = await request.json();
    
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const functions = getFunctions(app, process.env.NEXT_PUBLIC_FIREBASE_REGION);
    const sendNotification = httpsCallable(functions, 'sendNotification');
    
    const result = await sendNotification({ token, title, body });
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
