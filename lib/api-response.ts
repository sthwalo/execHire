import { NextResponse } from 'next/server';

type ApiResponseData = {
  success?: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export function apiResponse(data: ApiResponseData, status: number = 200) {
  const responseData = {
    success: status >= 200 && status < 300,
    ...data,
    timestamp: new Date().toISOString(),
  };

  return new NextResponse(JSON.stringify(responseData), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export function apiError(message: string, status: number = 400) {
  return apiResponse({ error: message }, status);
}

export function apiSuccess(data: any, message?: string) {
  return apiResponse({ data, message }, 200);
}
