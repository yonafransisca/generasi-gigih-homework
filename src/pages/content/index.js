import { useState, useEffect } from 'react';
import '../../App.css';
import './Content.css';
import '../../components/SearchTrack/trackList/Song/Song.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getTokenFromUrl } from '../../components/SpotifyService/spotifyService';
import LoginPage from '../../components/LoginPage';
import SearchTrack from '../../components/SearchTrack/index';
import Navbar from '../../components/Navbar';

function Content() {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [selectedSong, setSelectedSong] = useState([]);

    useEffect(() => {
        const hash = getTokenFromUrl();
        const accessToken = hash.access_token;
        if (accessToken) {
            setToken(accessToken);
            setIsLogin(true);
        } else {
            setToken(null);
            setIsLogin(false);
        }
    }, []);

    return (
        <Router>
            <Navbar
                countSelectedSong={selectedSong.length}
                isLogin={isLogin}
                token={token}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
            />
            <Switch>
                <Route exact path="/create-playlist">
                    {
                        token ? <SearchTrack token={token} selectedSong={selectedSong} setSelectedSong={setSelectedSong} /> : <Redirect to="/" />
                    }
                </Route>
                <Route exact path="/">
                    {!token ? <LoginPage /> : <Redirect to="/create-playlist" />}
                </Route>
            </Switch>
        </Router>
    );
}

export default Content;
