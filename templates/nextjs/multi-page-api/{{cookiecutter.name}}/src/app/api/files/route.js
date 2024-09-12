/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-26-2024
Description: Next.js API route to fetch files from a public API
===========================================================================
*/

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('https://wcstage.telus.com/aac-public-api-sample/files');
    
    if (!response.ok) {
      // Customize response based on the status code
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
