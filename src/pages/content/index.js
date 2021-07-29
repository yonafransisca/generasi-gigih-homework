import { useState, useEffect } from 'react'
import '../../App.css'
import './Content.css'
import '../../components/song/Song.css'
import axios from 'axios'
import data from '../../data/Data'
import getTokenFromUrl from '../../components/getTokenFromUrl/getTokenFromUrl'
import askToLogin from '../../components/askToLogin'
import TrackList from '../../components/trackList/trackList'
import SearchBar from '../../components/searchBar/searchBar'
import Navbar from '../../components/navbar'

function Content() {
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(null)
    const [songs, setSongs] = useState(data)
    const [searchQuery, setSearchQuery] = useState("")
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

    const isSelected = (song) => {
        return selectedSong.includes(song);
    }

    const handleSelectButton = (song) => {
        if (!isSelected(song)) {
            addSelection(song);
        } else {
            removeSelection(song);
        }
    }

    const addSelection = (song) => {
        setSelectedSong([...selectedSong, song]);
        console.log(selectedSong)
    }

    const removeSelection = (song) => {
        setSelectedSong(selectedSong.filter((track) => track !== song));
        console.log(selectedSong)
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
                    handleSelectButton={handleSelectButton}
                    isSelected={isSelected}
                />
            </div>
        )
    }

    return (
        <div>
            <Navbar countSelectedSong={selectedSong.length}/>
            {
                isLogin ? SearchTrack() : askToLogin()
            }
        </div>
    )
    
}

export default Content

