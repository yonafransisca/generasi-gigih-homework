import { useState } from 'react'
import './Song.css'

const Song = ({image, song, title, artist, album, handleSelectButton, isSelected }) => {
    
    return (
        <div className="track">
            <img className="track-image" src={image} alt={title} />
            <p className="track-title">{title}</p>
            <p className="track-artist">{artist}</p>
            <p className="track-album">{album}</p>
            <div className="overlay">
                <button
                    className="btn select"
                    // style={buttonStyle}
                    onClick={() => handleSelectButton(song.uri)}
                >
                    {!isSelected(song.uri) ? "Select" : "Deselect"}
                </button>
            </div>
        </div>
    )
}

export default Song
