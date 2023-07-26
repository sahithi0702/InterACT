import './Puzzledemo.css';
import { useState } from 'react';

function Puzzledemo() {
  const [showHint, setShowHint] = useState(false);

  const handleHintClick = () => {
    setShowHint(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="body">
              <div className='text-center'>
                <h1 style={{ textAlign: "center", color: "lightblue" }}>
                  LEVEL-8 In The Dark <img src='https://cdn.pixabay.com/photo/2013/07/13/11/42/star-158502__340.png' alt="Star" />
                </h1>
              </div>
              <h2 style={{ color: "white", marginTop: "20px" }}>
                As the lost individual found themselves in darkness, they looked up into the sky and spotted many stars. They marveled at the twinkling lights that seemed to guide their way. The stars formed constellations that told stories of ancient myths and legends. Find the solution from the above sentence to unlock the next clue and continue the journey towards solving the puzzle.
              </h2>
              <br />
              <br />
              <button className="btn btn-primary" style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>Reset</button>
              <button className="button hint-button" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px", backgroundColor: "red", display: "block" }} onClick={handleHintClick}>Check out Hint</button>
              {showHint && <div className="hint-message" style={{ color: "Yellow", textAlign: "center", marginTop: "20px" }}><h3>*Find for the Star to Move to Next Clue*</h3></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Puzzledemo;
