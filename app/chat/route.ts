import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Chat feature has been removed.' }, { status: 410 });
}
