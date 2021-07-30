import { useState } from "react"
import data from '../../data/Data'
import { API_ENDPOINT } from "../SpotifyService/spotifyApi"  
import SearchBar from "./SearchBar" 
import TrackList from "./trackList"
import axios from "axios"

const SearchTrack = ({ token, selectedSong, setSelectedSong }) => {
    const [songs, setSongs] = useState(data)
    const [searchQuery, setSearchQuery] = useState("")
    
    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }
    
    const getSpotifyTrack = async() => {
        if(searchQuery !== "") {
            const result = await axios.get(`${API_ENDPOINT}/search`, {
                headers: {
                    Authorization: `Bearer ${token}`     
                },
                params: {
                    q: searchQuery,
                    type: "track",
                    limit: 12,
                  },
            })  
            setSongs(result.data.tracks.items) 
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

export default SearchTrack