import { useState, useEffect } from 'react'
import '../../App.css'
import './Content.css'
import '../../components/song/Song.css'
import axios from 'axios'
import Header from '../../components/header'
import data from '../../data/Data'
import getTokenFromUrl from '../../components/getTokenFromUrl/getTokenFromUrl'
import askToLogin from '../../components/askToLogin'
import TrackList from '../../components/trackList/trackList'
import SearchBar from '../../components/searchBar/searchBar'

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

    const getSpotifyTrack = async() => {
        if(searchQuery !== "") {
            const result = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=12`, {
                headers: {
                    Authorization: `Bearer ${token}`     
                },
            })  
            setSongs(result.data.tracks.items) 
            console.log(result.data.tracks.items)
        } else {
            setSongs(data)
        }
    }

    const handleGetSearchResult = (event) => {
        event.preventDefault()
        getSpotifyTrack()
    }

    const SearchTrack = () => {
        return (
            <div className="search-bar">
                <SearchBar 
                    query={searchQuery}
                    handleQuery={handleSearchQuery}
                    handleSubmit={handleGetSearchResult}
                />
                <TrackList 
                    songs={songs}
                    setSongs={setSongs}
                />
            </div>
        )
    }

    return (
        <div>
            <Header />
            {
                isLogin ? SearchTrack() : askToLogin()
            }
        </div>
    )
    
}

export default Content

