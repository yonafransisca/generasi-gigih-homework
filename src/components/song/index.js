import { useState } from 'react'
import './Song.css'

const Song = ({songs, setSongs, image, song, title, artist, album, id }) => {
    const [buttonStatus, setButtonStatus] = useState(false)
    const [buttonColor, setButtonColor] = useState("rgb(127,103,198)")
    const [buttonTextColor, setButtonTextColor] = useState("white")
    const [buttonBorder, setButtonBorder] = useState("none")

    const handleButtonStatus = (event) => {
        songs.forEach(song => {
            console.log(song.uri === event.target.value)
            if(song.uri === event.target.value)
            setButtonStatus(!buttonStatus)
            setSongs([...songs, event.target.value])
        });
    }

    return (
        <div className="track">
            <img className="track-image" src={image} alt={title} />
            <p className="track-title">{title}</p>
            <p className="track-artist">{artist}</p>
            <p className="track-album">{album}</p>
            <div className="overlay">
                <button
                    className="btn select"
                    style={{backgroundColor: buttonColor, color: buttonTextColor, border: buttonBorder}}
                    value={id}
                    onClick={handleButtonStatus}
                        // const value = e.target.getAttribute("data-key")
                        // console.log(value);
                        // if(buttonStatus === false) {
                        //     setButtonStatus(true)
                        //     setItemStatus("Deselect")
                        //     setButtonColor("white")
                        //     setButtonTextColor("rgb(127,103,198)")
                        //     setButtonBorder("3px solid rgb(127,103,198)")

                        // }
                        // if (buttonStatus === true) {
                        //     setButtonStatus(false)
                        //     setItemStatus("Select")
                        //     setButtonColor("rgb(127,103,198)")
                        //     setButtonTextColor("white")
                        //     setButtonBorder("none")

                        // }  
                >
                    {buttonStatus ? "Deselect" : "Select"}
                </button>
            </div>
        </div>
    )
}

export default Song
