import './Song.css';

const Song = ({ image, song, title, artist, handleSelectButton, isSelected }) => {
    const CARD_SELECTED_STYLES = {
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
    };

    const BUTTON_SELECTED_STYLES = {
        backgroundColor: '#010606',
    };

    return (
        <div
            className="track"
            style={
                isSelected(song.uri) ? CARD_SELECTED_STYLES : {
                    color: 'black',
                }
            }
        >
            <div className="image-wrapper">
                <img className="track-image" src={image} alt={title} />
            </div>
            <div className="info-wrapper">
                <p className="track-title">{title}</p>
                <p className="track-artist">{artist}</p>
            </div>
            <div className="btn-wrapper">
                <button
                    className="btn primary"
                    style={
                        isSelected(song.uri) ? BUTTON_SELECTED_STYLES : {
                            color: '#fff',
                        }
                    }
                    onClick={() => { handleSelectButton(song.uri); }}
                    type="button"
                >
                    {!isSelected(song.uri) ? 'Select' : 'Deselect'}
                </button>
            </div>
        </div>
    );
};

export default Song;
