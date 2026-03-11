export async function HEAD() {
  return new Response(null, { status: 200 });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'online',
      service: 'e-commerce-platform',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
