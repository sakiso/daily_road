/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */
export async function GET({ request }: { request: Request}) {
  const bearerToken = request.headers.get('Authorization') || "";
   const res = await fetch(
    "https://api.spotify.com/v1/me ",
    {headers: {
      'Authorization': bearerToken,
      'ContentType': 'application/json'
    }},
  );

  return new Response(res.body)
}