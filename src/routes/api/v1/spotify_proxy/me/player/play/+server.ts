/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */
export async function PUT({ request }: { request: Request }) {
	const bearerToken = request.headers.get('Authorization') || '';
	const params = await request.json();

	const res = await fetch(
		`https://api.spotify.com/v1/me/player/play?device_id=${params.deviceId}`,
		{
			method: 'PUT',
			headers: {
				Authorization: bearerToken,
				ContentType: 'application/json'
			},
			body: JSON.stringify({ uris: params.uris })
		}
	);

	return new Response(res.body);
}
