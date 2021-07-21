import { useState, useEffect } from 'react'
import '../../App.css'
import './Content.css'
import TrackCard from '../../components/trackCard/index'
import axios from 'axios'
import Header from '../../components/header'
import data from '../../data/Data'
import getTokenFromUrl from '../../components/getTokenFromUrl/getTokenFromUrl'
import askToLogin from '../../components/askToLogin'

function Content() {
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(null)
    const [songs, setSongs] = useState(data)
    const [searchQuery, setSearchQuery] = useState("")

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

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleGetSpotifyTrack = (event) => {
        event.preventDefault()
        axios
            .get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=12`, {
                headers: {
                    Authorization: `Bearer ${token}`     
                },
            })   
            .then((response) => {
                if(searchQuery !== "") {
                    setSongs(response.data.tracks.items)
                    console.log(response.data.tracks.items)
                } else {
                    setSongs(data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSearchResult = () => {
        return (
            <div className="search-bar">
            <h1>Discover your favorite music.</h1>
            <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchQuery}
            />
            <button 
                onClick={handleGetSpotifyTrack}
                className="btn search"
            >
                Search
            </button>
            <div className="container">
                {
                    songs.map(track => {
                        return (
                            <TrackCard 
                                key={track.id} 
                                image={track.album.images[1].url} 
                                song={track.name} 
                                artist={track.artists[0].name} 
                                album={track.album.name}
                            />
                        )
                    })
                }
            </div>
        </div>
        )
    }

    return (
        <div>
            <Header />
            {
                isLogin ? handleSearchResult() : askToLogin()
            }
        </div>
    )
    
}

export default Content

