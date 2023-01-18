import React from 'react'
import Butt from '../../Components/Butt.jsx'
import './home.scss'
import {Link} from 'react-scroll'
import { useNavigate } from "react-router-dom";


// import { Theme } from '../../Theme';

function Home() {

  const navigate = useNavigate();
  
function handleClick() {
  navigate("/choice");
}



  return (
    <div>
        <div className="background"> 
          <div className="imCon">

          
            <div className="image">
            
            </div>
          </div>
          <div className="title">
            <h1>iMancala, <span className="sub">The game</span></h1>
          </div>
          <div className="parag">
          two-player turn-based strategy board games played with small stones, beans, or seeds and rows of holes or pits in the earth, a board or other playing surface. The objective is usually to capture all or some set of the opponent's pieces.
          </div>
         
          {/* <div className="arr-flex"></div> */}
          <Link onClick={handleClick}  spy={true} smooth={true} offset={50} duration={500} className="arrow-container">
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>  
          </Link>

          



        </div>
    </div>
  )
}

export default Home