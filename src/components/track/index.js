import React from 'react'
import './Track.css'
import Data from '../../data/Data'

function Track() {
    
    return (
        <div className="track">
            <img className="track-image" alt="track" src={Data.album.images[1].url} />
            <p className="track-title">{Data.name}</p>
            <p className="track-artist">{Data.artists[0].name}</p>
            <p className="track-album">{Data.album.name}</p>
            <button className="btn">Select</button>
        </div>
    )
}

export default Track
