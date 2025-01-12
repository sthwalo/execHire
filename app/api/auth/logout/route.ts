import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      // In a real application, you might want to invalidate the token
      // or add it to a blacklist. For now, we'll just return success
      // since the client will remove the token.
      return NextResponse.json({
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout failed:', error);
      return NextResponse.json(
        { error: 'Logout failed' },
        { status: 500 }
      );
    }
  })(request);
}
