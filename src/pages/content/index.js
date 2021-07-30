import { useState, useEffect } from 'react'
import '../../App.css'
import './Content.css'
import '../../components/SearchTrack/trackList/Song/Song.css'
import { getTokenFromUrl } from '../../components/SpotifyService/spotifyService'
import LoginPage from '../../components/LoginPage'
import SearchTrack from '../../components/SearchTrack/index'
import Navbar from '../../components/Navbar'

function Content() {
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(null)
    const [selectedSong, setSelectedSong] = useState([])

    useEffect(() => {
        const hash = getTokenFromUrl();
        const accessToken = hash.access_token;
        if (accessToken) {
            setToken(accessToken)
            setIsLogin(true)
        } else {
            setToken(null)
            setIsLogin(false)
        }
    }, [])

    return (
        <div>
            <Navbar 
                countSelectedSong={selectedSong.length}
                isLogin={isLogin}
                token={token} 
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
            />
            {
                isLogin 
                ? <SearchTrack 
                    token={token} 
                    selectedSong={selectedSong}
                    setSelectedSong={setSelectedSong}
                /> 
                : <LoginPage/>
            }
        </div>
    )
    
}

export default Content

