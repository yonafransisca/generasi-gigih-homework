import { useState } from 'react';
import axios from 'axios';
import data from '../../data/Data';
import { API_ENDPOINT } from '../SpotifyService/spotifyApi';
import SearchBar from './SearchBar';
import TrackList from './trackList';

const SearchTrack = ({ token, selectedSong, setSelectedSong }) => {
    const [songs, setSongs] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const getSpotifyTrack = async () => {
        if (searchQuery !== '') {
            const result = await axios.get(`${API_ENDPOINT}/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchQuery,
                    type: 'track',
                    limit: 12,
                },
            });
            setSongs(result.data.tracks.items);
        } else {
            setSongs(data);
        }
    };

    const handleGetSearchResult = (event) => {
        event.preventDefault();
        getSpotifyTrack();
    };

    const isSelected = (song) => {
        return selectedSong.includes(song);
    };

    const addSelection = (song) => {
        setSelectedSong([...selectedSong, song]);
        // eslint-disable-next-line no-console
        console.log(selectedSong);
    };

    const removeSelection = (song) => {
        setSelectedSong(selectedSong.filter((track) => { return track !== song; }));
        // eslint-disable-next-line no-console
        console.log(selectedSong);
    };

    const handleSelectButton = (song) => {
        if (!isSelected(song)) {
            addSelection(song);
        } else {
            removeSelection(song);
        }
    };

    return (
        <div className="search-track">
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
    );
};

export default SearchTrack;
