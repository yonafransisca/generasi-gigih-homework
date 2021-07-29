import { useState, useEffect } from 'react'
import './Navbar.css'
import handleLogin from '../handleLogin/handleLogin'
import getTokenFromUrl from '../getTokenFromUrl/getTokenFromUrl'

const Navbar = ({ countSelectedSong }) => {
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
            <div className="playlist-btn-wrapper">
                {countSelectedSong ? (<p className="count">{countSelectedSong}</p>) : ('')}
                <button className="btn create-playlist">
                    {'    '}Create Playlist
                </button>
            </div>
        )
    }

    return (
        <div className="header" >
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

export default Navbar