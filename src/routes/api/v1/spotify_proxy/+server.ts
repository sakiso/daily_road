/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */
export async function GET({ url, request }: { url: URL, request: Request}) {
  const bearerToken = request.headers.get('Authorization') || "";
  const targetPath = url.searchParams.get("path")

  console.log(
    await fetch(
      `https://api.spotify.com/v1/${targetPath + url.search}`,
      {headers: {
        'Authorization': bearerToken,
        'ContentType': 'application/json'
      }},
    )
  )

  // todo: ずっっっとUnAuthorizeになる

  return await fetch(
    `https://api.spotify.com/v1/${targetPath + url.search}`,
    {headers: {
      'Authorization': bearerToken,
      'ContentType': 'application/json'
    }},
  );
}