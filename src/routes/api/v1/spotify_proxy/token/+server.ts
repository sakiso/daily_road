import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export async function POST({ request }: { request: Request }) {
	const requestBody: { authenticationCode: string } = await request.json();

	const targetUrl = 'https://accounts.spotify.com/api/token';
	const encodedClientInfo = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
		'base64'
	);
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: 'Basic ' + encodedClientInfo
	};
	const params = {
		code: requestBody.authenticationCode,
		redirect_uri: 'http://localhost:5173/authorize',
		grant_type: 'authorization_code'
	};

	// NOTE: content-typeがx-www-form-urlencodedのためクエリストリングの形式にする必要がある
	const querystring = new URLSearchParams(params).toString();

	const response: Response = await fetch(targetUrl, {
		method: 'POST',
		headers: headers,
		body: querystring
	});

	// HACK: そのままresponseを移送すると受取先でパースしたとき"fetch typeerror: terminated"のエラーが出るため、
	//       新しいResponseオブジェクトを生成している 原因は未解明
	return new Response(response.body);
}
