/** CORS対策のためにSpotifyのAPIサーバーの間のプロキシとして使う */
export async function GET({ params, request }: { params: { slug: string }; request: Request }) {
	const trackId = params.slug;
	const bearerToken = request.headers.get('Authorization') || '';
	const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
		headers: {
			Authorization: bearerToken,
			ContentType: 'application/json'
		}
	});

	return new Response(res.body);
}
