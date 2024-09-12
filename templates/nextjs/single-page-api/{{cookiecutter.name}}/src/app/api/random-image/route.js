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
