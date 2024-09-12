/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-26-2024
Description: Next.js Dynamic API route to fetch a specific file from a
public API. For more information about Dynamic routes in Next.js, visit:

https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
===========================================================================
*/

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Assuming the URL structure is /api/files/:id

    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Invalid ID' }), {
        status: 400
      });
    }

    const response = await fetch(`https://wcstage.telus.com/aac-public-api-sample/file/${id}`);

    if (!response.ok) {
      const errorMessage = response.status === 404 ? 'Resource not found' : 'An error occurred';
      return new NextResponse(JSON.stringify({ error: errorMessage }), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    });
  }
}
