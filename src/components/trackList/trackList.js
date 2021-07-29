import React, { useState } from 'react'
import '../../pages/content/Content.css'
import Song from '../song/index'

const TrackList = ({ songs, handleSelectButton, isSelected}) => {

    // const [buttonColor, setButtonColor] = useState("rgb(127,103,198)")
    // // const [buttonTextColor, setButtonTextColor] = useState("white")
    // // const [buttonBorder, setButtonBorder] = useState("none")
    const [buttonStyle, setButtonStyle] = useState({
        backgroundColor: "rgb(127,103,198)", 
        color: "white", 
        border: "none"
    })

    

    return (
        <div className="container">
            {
                songs.map(song => {
                    return (
                        < Song 
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
                    )
                })
            }
        </div>
    )
}

export default TrackList
