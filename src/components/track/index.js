import React from 'react'
import './Track.css'
import '../../App.css'


function TrackCard(props) {
    return (
        <div className="track">
            <img className="track-image" src={props.image} alt={props.name} />
            <p className="track-title">{props.song}</p>
            <p className="track-artist">{props.artist}</p>
            <p className="track-album">{props.album}</p>
            <div className="overlay">
                <button className="btn select">Select</button>
            </div>
        </div>
    )
}

export default TrackCard
