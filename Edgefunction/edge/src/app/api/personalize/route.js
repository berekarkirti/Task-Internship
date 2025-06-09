import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) 
{
  const { geo } = request;
  const country = geo?.country || 'US';
  const currency = country === 'US' ? 'USD' : 'EUR';

  const originResponse = await fetch(new URL('/products', request.url), 
  {
    headers: request.headers,
  });

  const html = await originResponse.text();

  const modifiedHtml = html.replace('{{CURRENCY}}', currency);

  const response = new NextResponse(modifiedHtml, 
  {
    status: originResponse.status,
    headers: 
    {
      ...originResponse.headers,
      'X-Custom-Country': country,
      'Content-Type': 'text/html',
    },
  });

  return response;
}