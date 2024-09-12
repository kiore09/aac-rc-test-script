/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-26-2024
Description: Next.js API route to fetch random image from a public API
===========================================================================
*/

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = new URL('https://wcstage.telus.com/aac-public-api-sample/random-image');
    // Appending a unique timestamp as a query parameter to the URL
    url.searchParams.append('nocache', new Date().getTime());

    const imageResponse = await fetch(url.toString());

    if (!imageResponse.ok) {
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch image' }), {
        status: imageResponse.status,
      });
    }

    const imageBlob = await imageResponse.blob();

    return new Response(imageBlob, {
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type'),
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    });
  }
}
