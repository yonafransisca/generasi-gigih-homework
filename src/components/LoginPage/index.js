import './LoginPage.css';
import { handleLogin } from '../SpotifyService/spotifyService';
import Image from '../../images/image-4.jpg';

const LoginPage = () => {
    return (
        <div className="get-started">
            <div className="login-background">
                <img className="login-image" src={Image} alt="playlist" />
            </div>
            <div className="login-content">
                <h1 className="slogan">Translate your mood into playlist.</h1>
                <div className="btn-wrapper">
                    <button
                        onClick={handleLogin}
                        className="btn call-to-action primary"
                        type="button"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
