import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
// import axios from 'axios';

// { url, request }: { url: URL; request: Request } もしENVとかstoreが読み出せないならフロントから渡す
export async function POST({ request }: { request: Request }) {
	const requestBody:{authenticationCode: string} = await request.json()
	const targetUrl = 'https://accounts.spotify.com/api/token'
	const encodedClientInfo = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
		'base64'
	);

	// console.log("🚀 ~ file: +server.ts:8 ~ POST ~ requestBody", requestBody)
	// console.log("🚀 ~ file: +server.ts:12 ~ POST ~ encodedClientInfo", 'Basic ' + encodedClientInfo)
	// console.log("🚀 ~ file: +server.ts:12 ~ POST ~ authenticationCode", requestBody.authenticationCode)

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + encodedClientInfo
	};
	const params = {
		'code': requestBody.authenticationCode,
		'redirect_uri': 'http://localhost:5173/authorize',
		'grant_type': 'authorization_code',
				}	


	const querystring = new URLSearchParams(params).toString()



	const response:Response = await fetch(targetUrl,{
    method: 'POST',
		headers: headers,
		body:querystring // todo: これStringにする必要ありそう。contenttypeがurlencodedだから
	})

	console.log(await response.json());
	return response;
}
