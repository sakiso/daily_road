// import { error } from '@sveltejs/kit';
// import { state } from "$lib/stores/spotify_authorization_store";

// import axios from "axios";

export async function load({ url }: { url: URL }) {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	console.log('fetchまえ');

	const params = { authenticationCode: code };
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
	const hoge = await fetch('http://localhost:5173/api/v1/spotify_proxy/token', {
		method: 'POST',
		// headers: headers,
		body: JSON.stringify(params)
	})

	console.log("fetchおわり")
	console.log(await hoge.json())
	// console.log(await hoge.json())
	// console.log(await hoge.text())
	// const response: authorizationResponse = hoge.json(); // json()するとterminateされる

	// await axios.post('http://localhost:5173/api/v1/spotify_proxy/token',params)

	return { state: state, accessToken: "response.access_token"};
	// return { state: state, accessToken: response.access_token };
}

interface authorizationResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}
