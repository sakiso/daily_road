// export async function GET({ url, request }: { url: URL, request: Request}) {
//   const bearerToken = request.headers.get('Authorization') || "";
//   const targetPath = url.searchParams.get("path")
//   // todo: path以外のparamsも受け取って転送

//   return await fetch(
//     `https://api.spotify.com/v1/${targetPath + url.search}`,
//     {headers: {
//       'Authorization': bearerToken,
//       'ContentType': 'application/json'
//     }},
//   );
// }

// export async function POST({ url, request }: { url: URL, request: Request}) {
//   const bearerToken = request.headers.get('Authorization') || "";
//   const targetPath = url.searchParams.get("path")

//   // todo: path以外のparamsも受け取って転送

//   return await fetch(
//     `https://api.spotify.com/v1/${targetPath + url.search}`,
//     {headers: {
//       'Authorization': bearerToken,
//       'ContentType': 'application/json'
//     }},
//   );
// }