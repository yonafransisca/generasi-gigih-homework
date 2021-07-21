const clientId = process.env.REACT_APP_CLIENT_ID
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize"
const redirectUriAfterLogin = "http://localhost:3000/"

const handleLogin = () => {
    window.location = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUriAfterLogin}&response_type=token&show_dialog=true`
}

export default handleLogin