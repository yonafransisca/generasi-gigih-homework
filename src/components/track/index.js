import React from 'react'
import './Track.css'
import data from '../../data/Data'

function TrackData(props) {
    return (
        <div className="track">
            <img className="track-image" src={props.image} alt={props.name} />
            <p className="track-title">{props.song}</p>
            <p className="track-artist">{props.artist}</p>
            <p className="track-album">{props.album}</p>
            <div className="overlay">
                <button className="btn">Select</button>
            </div>
        </div>
    )
}

function TrackComponents() { 
    const trackList = data.map(track => 
        <TrackData key={track.id} 
            image={track.album.images[1].url} 
            song={track.name} 
            artist={track.artists[0].name} 
            album={track.album.name}
        />)

    return (
        <div className="container">
            {trackList}
        </div>
    )
}

export default TrackComponents


