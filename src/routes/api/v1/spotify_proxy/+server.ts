/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */
export async function GET({ url, request }: { url: URL, request: Request}) {
  const bearerToken = request.headers.get('Authorization') || "";
  const targetPath = url.searchParams.get("path")

  return fetch(
    // todo; spotifyドメインとv1ははコンスタントに集約したい
    `https://api.spotify.com/v1/${targetPath + url.search}`,
    {headers: {
      'Authorization': bearerToken
    }},
  );
}