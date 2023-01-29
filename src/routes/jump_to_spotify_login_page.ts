// https://accounts.spotify.com/authorize?response_type=code&client_id=7b0c1a02c7124739993c37007d8a4ebe&state=y4hbl&scope=streaming+user-library-read&redirect_uri=http:%2F%2Flocalhost:5173%2F

export async function jumpToSpotifyLoginPage(client_id: string) {
  const spotifyAuthorizeBaseUrl = 'https://accounts.spotify.com/authorize?'
  const state = Math.random().toString(36).slice(-5)

  //todo: リダイレクト後にstateが一致しない場合はエラーにする
    const params = {
      response_type: 'code',
      client_id: client_id,
      state: state,
      scope: 'streaming user-library-read',
      redirect_uri: 'http://localhost:5173/authorize'
      //todo: 本番移行したときドメインを自動で帰
    };

  const queryParams = new URLSearchParams(params).toString()
  window.location.href = `${spotifyAuthorizeBaseUrl}${queryParams}`;
}
