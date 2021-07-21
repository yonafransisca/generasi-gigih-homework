import './askToLogin.css'
import handleLogin from '../handleLogin/handleLogin'

function askToLogin() {
    return (
        <div className="get-started">
            <h1 className="slogan">Discover and collect all your favorite musics in one platform</h1>
            <button 
                onClick={handleLogin}
                className="btn call-to-action"
            >
                Get Started
            </button>
        </div>
    )
}

export default askToLogin
