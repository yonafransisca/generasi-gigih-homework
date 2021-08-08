import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import data from '../../data/Data';
import { API_ENDPOINT } from '../SpotifyService/spotifyApi';
import SearchBar from './SearchBar';
import TrackList from './trackList';

interface SearchTrackProps {
    token: string,
    selectedSong: string[],
    setSelectedSong: Dispatch<SetStateAction<string[]>>
}

const SearchTrack = ({ token, selectedSong, setSelectedSong }: SearchTrackProps) => {
    const [songs, setSongs] = useState(data);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchQuery = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const getSpotifyTrack = async (): Promise<void> => {
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

    const handleGetSearchResult = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        getSpotifyTrack();
    };

    const isSelected = (song: string) => {
        return selectedSong.includes(song);
    };

    const addSelection = (song: string) => {
        setSelectedSong([...selectedSong, song]);
        // eslint-disable-next-line no-console
        console.log(selectedSong);
    };

    const removeSelection = (song: string) => {
        setSelectedSong(selectedSong.filter((track: string) => { return track !== song; }));
        // eslint-disable-next-line no-console
        console.log(selectedSong);
    };

    const handleSelectButton = (song: string) => {
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
