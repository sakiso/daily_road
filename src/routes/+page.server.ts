import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import type { RootPageLoadData } from '../lib/types/types';

export function load():RootPageLoadData {
  return {spotifyClientID: SPOTIFY_CLIENT_ID}
}
