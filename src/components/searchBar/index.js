import { useState, useEffect } from 'react'
import '../../App.css'
import './searchBar.css'
import TrackCard from '../track/index'
import axios from 'axios'

function SearchBar() {
    const [token, setToken] = useState("")
    const [data, setData] = useState({})
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"))
        }
    }, [])

    const handleGetSpotifyData = () => {
        axios
            .get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=12`, {
                headers: {
                    Authorization: `Bearer ${token}`     
                },
            })   
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div className="search-bar">
            <h1>Discover your favorite music.</h1>
            <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchQuery}
            />
            <button 
                onClick={handleGetSpotifyData}
                className="btn search"
            >
                Search
            </button>
            <div className="container">
                {data.tracks.items?.map(track => {
                    return (
                        <TrackCard 
                            key={track.id} 
                            image={track.album.images[1].url} 
                            song={track.name} 
                            artist={track.artists[0].name} 
                            album={track.album.name}
                        />
                    )
                })}
            </div>
        </div>
    )
    
}

export default SearchBar

