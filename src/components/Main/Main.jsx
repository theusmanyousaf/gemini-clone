import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/Context';

const Main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents page reload on form submission
    if (input) {
      onSent(input);
    }
  };

  return (
    <div className='main'>
      <nav className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </nav>
      <div className="main-container">
        {!showResult
          ? <>
            <div className="greet">
              <p><span>Hello Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          : <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
                ? <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>
        }

        <div className="main-bottom">
          <form onSubmit={handleSubmit} className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              id='search'
              type="text"
              placeholder='Enter a prompt here'
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && <button type="submit">
                <img src={assets.send_icon} alt="" />
              </button>}
            </div>
          </form>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main