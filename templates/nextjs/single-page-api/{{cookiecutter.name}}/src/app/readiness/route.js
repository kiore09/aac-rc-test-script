/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Endpoint for healthcheck readiness probe, and returns new HTTP response with 200 and body of 'ok'
===========================================================================
*/

export async function GET() {
  return new Response('ok', { status: 200 })
}
