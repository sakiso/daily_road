export async function load({ url }: { url: URL }) {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	const params = { authenticationCode: code };
	const response = await fetch('http://localhost:5173/api/v1/spotify_proxy/token', {
		method: 'POST',
		body: JSON.stringify(params)
	});
	const responseJson: authorizationResponse = await response.json();
	console.log("🚀 ~ file: +page.server.ts:11 ~ load ~ responseJson", responseJson)
	return { state: state, accessToken: responseJson.access_token };
}

interface authorizationResponse {
	access_token: string | undefined;
	token_type: string | undefined;
	expires_in: number | undefined;
	refresh_token: string | undefined;
	scope: string | undefined;
	// エラーの場合は以下2項目のみ
	error: string | undefined;
	error_description: string | undefined;
}
