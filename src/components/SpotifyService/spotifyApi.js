const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const API_ENDPOINT = 'https://api.spotify.com/v1';
const RESPONSE_TYPE = 'token';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPE = 'playlist-modify-private';
const REDIRECT_URI = 'http://localhost:3000/';

export {
    AUTH_ENDPOINT,
    API_ENDPOINT,
    RESPONSE_TYPE,
    CLIENT_ID,
    SCOPE,
    REDIRECT_URI,
};
