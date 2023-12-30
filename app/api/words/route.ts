export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ word: request.url.slice(request.url.lastIndexOf("=") + 1) }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
