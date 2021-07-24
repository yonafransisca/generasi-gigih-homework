import React, { useState } from 'react'
import '../../pages/content/Content.css'
import Song from '../song/index'

const TrackList = ({ songs, setSongs }) => {
    return (
        <div className="container">
            {
                songs.map(song => {
                    return (
                        < Song 
                            songs={songs}
                            setSongs={setSongs}
                            song={song}
                            key={song.uri}
                            id={song.uri}
                            image={song.album.images[1].url}
                            title={song.name}
                            artist={song.artists[0].name}
                            album={song.album.name}
                        />
                    )
                })
            }
        </div>
    )
}

export default TrackList
