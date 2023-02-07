/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */

export function GET({ url }: { url: URL}) {
  // todo;
  const targetPath = url.searchParams.get("path")
  return fetch(`https://api.spotify.com/${targetPath + url.search}`);

  // todo: ERR_CONTENT_DECODING_FAILEDになる
}