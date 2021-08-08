import Song from './Song/index.tsx';
import './TrackList.css';

const TrackList = ({ songs, handleSelectButton, isSelected }) => {
    return (
        <div className="container">
            {
                songs.map((song) => {
                    return (
                        <Song
                            song={song}
                            key={song.uri}
                            id={song.uri}
                            image={song.album.images[1].url}
                            title={song.name}
                            artist={song.artists[0].name}
                            album={song.album.name}
                            handleSelectButton={handleSelectButton}
                            isSelected={isSelected}
                        />
                    );
                })
            }
        </div>
    );
};

export default TrackList;
