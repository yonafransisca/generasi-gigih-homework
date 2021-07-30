import { useState } from 'react'
import './Navbar.css'
import { handleLogin } from '../SpotifyService/spotifyService'
import PlaylistForm from '../PlaylistForm'

const Navbar = ({ countSelectedSong, isLogin, token, selectedSong, setSelectedSong }) => {

    const showLoginButton = () => {
        return (
            <button 
                className="btn primary"
                onClick={handleLogin}
            >
                Login with Spotify
            </button>
        )
    }

    const ShowCreatePlaylistButton = () => {
        const [isOpen, setIsOpen] = useState(false)

        const handleClosePlaylistForm = () => {
            setIsOpen(false)
        }

        return (
            <div className="playlist-btn-wrapper">
                {countSelectedSong ? (<p className="count">{countSelectedSong}</p>) : ('')}
                <button 
                    className="btn primary"
                    onClick={() => setIsOpen(true)}
                >
                    {'    '}Create Playlist
                </button>
                <PlaylistForm 
                    open={isOpen} 
                    onClose={handleClosePlaylistForm} 
                    token={token}
                    selectedSong={selectedSong}
                    setSelectedSong={setSelectedSong}
                    countSelectedSong={countSelectedSong}
                    handleClosePlaylistForm={handleClosePlaylistForm}
                />
            </div>
        )
    }

    return (
        <div className="header" style={isLogin ? {backgroundColor: '#fff'} : {backgroundColor: 'transparent'}}>
            <div>
                <h1 className="logo" style={isLogin ? {color: 'black'} : {color: '#fff'}}>
                    Create Playlist App
                </h1>
            </div>
            <div>
                {
                    isLogin ? ShowCreatePlaylistButton() : showLoginButton()
                }
            </div>
        </div>
    )
}

export default Navbar