import './askToLogin.css'
import handleLogin from '../handleLogin/handleLogin'
import Image from '../../images/image-2.jpg'

function AskToLogin() {
    return (
        <div className="get-started">
            <div className="login-background">
                <img className="login-image" src={Image} alt="playlist"/>
            </div>
            <div className="login-content">
                <h1 className="slogan">Translate your mood into playlist.</h1>
                <div className="btn-wrapper">
                    <button 
                        onClick={handleLogin}
                        className="btn call-to-action"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AskToLogin
