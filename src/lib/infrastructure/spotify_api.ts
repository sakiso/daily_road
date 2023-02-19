// // todo: こいついらんわ クライアントからはいきなりproxyを呼べばいい

// import { state, authenticationCode, accessToken } from '$lib/stores/spotify_authorization_store';
// // import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
// import axios from 'axios';


//  export async function fetchAccessToken() {
// 		const getTokenPath = '/token';
// 		const params = {
//       grant_type: "authorization_code",
//       code: authenticationCode.subscribe,
//       redirect_uri: 'http://localhost:5173/'	//todo: 本番移行したときドメインが自動で変わるようにする
// 		};
//     let response = {};
// 		await axios
// 			.post(`/api/v1/spotify_proxy/?path=${getTokenPath}`, {
//         params: params,
//         headers: {
// 					Authorization: `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')}`,
// 				}
// 			})
// 			.then((res) => {
// 				response = res;
// 			});
//       console.log(response)
//       // accessToken.set(response.accessToken); // note: 認証リダイレクト後に同一ユーザか判定するためstoreにstateを保存しておく

// 		return response;
// 	}


// // export class SpotifyApi {
// // 	baseUrl: string;

// // 	constructor() {
// // 		this.baseUrl = 'https://accounts.spotify.com';
// // 	}

// //   // async getAccessToken() {
// //   //   // todo: getがGETと紛らわしい
// //   //   // todo: これAuthenticationCode取得のコールバックでそのままやる
// //   //   // memo: やっぱライブラリ使ったほうがよかったかなぁ でも古いしなぁ
// // 	// 	const getTokenPath = '/token';
// // 	// 	const params = {
// //   //     grant_type: "authorization_code",
// //   //     code: authenticationCode.subscribe,
// //   //     redirect_uri: 'http://localhost:5173/'	//todo: 本番移行したときドメインが自動で変わるようにする
// // 	// 	};
// //   //   let response = {};
// // 	// 	await axios
// // 	// 		.post(`/api/v1/spotify_proxy/?path=${getTokenPath}`, {
// //   //       params: params,
// //   //       headers: {
// // 	// 				Authorization: `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')}`,
// // 	// 			}
// // 	// 		})
// // 	// 		.then((res) => {
// // 	// 			response = res;
// // 	// 		});
// //   //     console.log(response)
// //   //     // accessToken.set(response.accessToken); // note: 認証リダイレクト後に同一ユーザか判定するためstoreにstateを保存しておく

// // 	// 	return response;
// // 	// }

// // 	async getCurrentUserProfile(accessToken: string): Promise<object> {
// //     // todo: CORS出る！！ proxyかます
// //     // https://stackoverflow.com/questions/72753092/how-to-proxy-on-svelte-kit-in-dev-mode が参考になりそう
// // 		const currentUserProfilePath = 'me';
// // 		let response = {};
// //     // todo: axiosじゃなくてfetchでもいいんかな
// // 		await axios
// // 			.get(`/api/v1/spotify_proxy/?path=${currentUserProfilePath}`, {
// // 				headers: {
// // 					Authorization: `Bearer ${accessToken}`,
// // 				}
// // 			})
// // 			.then((res) => {
// // 				response = res;
// // 			});
// // 		return response;
// // 	}
// // }

// //  // いらんかも
// // interface responseOfGetAccessToken { // 例
// //     "access_token": string, // "NgCXRK...MzYjw"
// //     "token_type": string, // "Bearer"
// //     "scope": string, // "user-read-private user-read-email",
// //     "expires_in": string, // 3600,
// //     "refresh_token": string, // "NgAagA...Um_SHo"
// // }
