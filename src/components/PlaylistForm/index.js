import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../SpotifyService/spotifyApi';
import './PlaylistForm.css';

// eslint-disable-next-line max-len
const PlaylistForm = ({ open, onClose, handleClosePlaylistForm, token, selectedSong, setSelectedSong, countSelectedSong }) => {
    const [user, setUser] = useState({

    });
    const [playlist, setPlaylist] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_ENDPOINT}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => { setUser(response.data); })
                // eslint-disable-next-line no-console
                .catch((error) => { console.log(error); });
        }
    }, [token]);

    const handlePlaylistFormInput = (event) => {
        const { name, value } = event.target;
        setPlaylist({
            ...playlist,
            [name]: value,
        });
    };

    const handlePlaylistFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const createPlaylist = await axios.post(`${API_ENDPOINT}/users/${user.id}/playlists`,
                {
                    name: playlist.title,
                    description: playlist.description,
                    public: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (countSelectedSong === 0) {
                // eslint-disable-next-line no-alert
                alert('Please select some songs.');
            } else {
                await axios.post(`${API_ENDPOINT}/playlists/${createPlaylist.data.id}/tracks`,
                    {
                        uris: selectedSong,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                // eslint-disable-next-line no-alert
                alert('New playlist created on your Spotify Account!');
                setSelectedSong([]);
                handleClosePlaylistForm();
                event.target.reset();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    if (!open) return null;

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal playlist-form">
                <form onSubmit={handlePlaylistFormSubmit}>
                    <div>
                        <label htmlFor="playlist-title">Insert your playlist title:</label>
                        <br />
                        <input
                            id="playlist-title"
                            type="text"
                            minLength="10"
                            placeholder="Enter playlist title."
                            name="title"
                            onChange={handlePlaylistFormInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="playlist-description">What&apos;s this playlist about?:</label>
                        <br />
                        <input
                            id="playlist-description"
                            type="text"
                            minLength="20"
                            placeholder="Enter playlist description."
                            name="description"
                            onChange={handlePlaylistFormInput}
                        />
                    </div>
                    <div style={{
                        display: 'flex', justifyContent: 'flex-end', marginTop: '30px',
                    }}
                    >
                        <button
                            className="btn cancel"
                            onClick={onClose}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn primary"
                            type="submit"
                        >
                            Create!
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PlaylistForm;
