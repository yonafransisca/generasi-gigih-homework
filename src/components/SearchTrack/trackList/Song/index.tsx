import './Song.css';

interface SongProps {
    image: string,
    id: string,
    title: string,
    artist: string,
    handleSelectButton: ((id: string) => string),
    isSelected: ((id: string) => boolean)
}

const Song = ({ image, id, title, artist, handleSelectButton, isSelected } : SongProps) => {
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
                isSelected(id) ? CARD_SELECTED_STYLES : {
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
                        isSelected(id) ? BUTTON_SELECTED_STYLES : {
                            color: '#fff',
                        }
                    }
                    onClick={() => { handleSelectButton(id); }}
                    type="button"
                >
                    {!isSelected(id) ? 'Select' : 'Deselect'}
                </button>
            </div>
        </div>
    );
};

export default Song;
