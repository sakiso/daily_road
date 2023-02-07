import { state } from '$lib/stores/spotify_authorization_store';
import axios from 'axios';

export class SpotifyApi {
	baseUrl: string;

	constructor() {
		this.baseUrl = 'https://accounts.spotify.com';
	}

	async login(clientId: string) {
		const authorizePath = '/authorize';
		const stateStr = Math.random().toString(36).slice(-5);
		const params = {
			response_type: 'code',
			client_id: clientId,
			state: stateStr, //todo: unsubscribe必要？
			scope: 'streaming user-library-read',
			redirect_uri: 'http://localhost:5173/authorized'
			//todo: 本番移行したときドメインが自動で変わるようにする
		};

		state.set(stateStr); // note: 認証リダイレクト後に同一ユーザか判定するためstoreにstateを保存しておく
		const queryParams = new URLSearchParams(params).toString();
		window.location.href = `${this.baseUrl}${authorizePath}?${queryParams}`;
	}

	async getCurrentUserProfile(accessToken: string): Promise<object> {
    // todo: CORS出る！！ proxyかます
    // https://stackoverflow.com/questions/72753092/how-to-proxy-on-svelte-kit-in-dev-mode が参考になりそう
		const currentUserProfilePath = 'me';
		let response = {};
		axios
			.get(`/api/v1/spotify_proxy/?path=${currentUserProfilePath}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
			.then((res) => {
				response = res;
			});
		return response;
	}
}
