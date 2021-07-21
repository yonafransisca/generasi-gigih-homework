import { useEffect } from 'react'
import './Header.css'

const clientId = process.env.REACT_APP_CLIENT_ID
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize"
const redirectUriAfterLogin = "http://localhost:3000/"


export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, currentValue) => {
            console.log(currentValue)
            let [key, value] = currentValue.split('=')
            acc[key] = value

            return acc
        }, {}) 
}

function Header() {
    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token, 
                expires_in, 
                token_type
            } = getTokenFromUrl(window.location.hash)
            
            localStorage.clear()
            localStorage.setItem("accessToken", access_token)
            localStorage.setItem("tokenType", token_type)
            localStorage.setItem("expiresIn", expires_in)
        }
    })

    const handleLogin = () => {
        window.location = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUriAfterLogin}&response_type=token&show_dialog=true`
    }
    
    return (
        <div className="header">
            <div>
                <h1 className="logo">Create Playlist App</h1>
            </div>
            <div>
                <button 
                    className="btn login"
                    onClick={handleLogin}
                >
                    Login with Spotify
                </button>
            </div>
        </div>
    )
}

export default Header