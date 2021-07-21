import { useState, useEffect } from 'react'
import './Header.css'
import handleLogin from '../handleLogin/handleLogin'
import getTokenFromUrl from '../getTokenFromUrl/getTokenFromUrl'

const Header = () => {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const hash = getTokenFromUrl();
        const accessToken = hash.access_token;
        if (accessToken) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])

    const showLoginButton = () => {
        return (
            <button 
                className="btn login"
                onClick={handleLogin}
            >
                Login with Spotify
            </button>
        )
    }

    const showCreatePlaylistButton = () => {
        return (
            <button className="btn create-playlist">+ Create Playlist</button>
        )
    }

    return (
        <div className="header">
            <div>
                <h1 className="logo">Create Playlist App</h1>
            </div>
            <div>
                {
                    isLogin ? showCreatePlaylistButton() : showLoginButton()
                }
            </div>
        </div>
    )
}

export default Header