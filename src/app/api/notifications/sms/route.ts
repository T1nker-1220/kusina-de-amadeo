import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, data } = await request.json();

    // TODO: Implement SMS sending logic
    // For now, just log the request
    console.log("Sending SMS to:", to, "with data:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send SMS" },
      { status: 500 }
    );
  }
}
