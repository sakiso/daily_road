import axios from "axios";

export function loginSpotify(client_id: string): void {
  const redirect_uri = 'http://localhost:5173/';
  const scope = 'streaming user-library-read';

  axios.get('https://accounts.spotify.com/authorize?', {
    params: {
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }
  });
}
