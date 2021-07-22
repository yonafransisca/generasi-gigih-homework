import { useState, useEffect } from 'react'
import '../../App.css'
import './Content.css'
import '../../components/trackCard/TrackCard.css'
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
    const [buttonStatus, setButtonStatus] = useState(false)
    const [itemStatus, setItemStatus] = useState("Select")
    

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

    function handleSelectButton(id) {
            songs.map(track => {
            if (track.uri === id) {
                console.log(track.uri)
                setButtonStatus(!buttonStatus)
                setItemStatus(!buttonStatus ? "Deselect" : "Select")
            }
            return track
        })
    }

    const TrackCard = (props) => {
        return (
            <div className="track" >
                {props.children}
            </div>
        )
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
                                    key={track.uri} 
                                    // image={} 
                                    // song={} 
                                    // artist={} 
                                    // album={}
                                >
                                    <img className="track-image" src={track.album.images[1].url} alt={track.name} />
                                    <p className="track-title">{track.name}</p>
                                    <p className="track-artist">{track.artists[0].name}</p>
                                    <p className="track-album">{track.album.name}</p>
                                    <div className="overlay">
                                        <button
                                            className="btn select"
                                            onClick={() => handleSelectButton(track.uri)}
                                        >
                                            {itemStatus}
                                        </button>
                                    </div>
                                </TrackCard>
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

