import React from 'react'
import './Choice2.scss'
import { useNavigate } from "react-router-dom";



function Choice2(props) {

  const navigate = useNavigate();
    
  function handleClick() {
    navigate(props.link);
  }




  return (
    
    <div id="linkury"  onClick={handleClick} > 
      
      
        <div id="cardo">
          <div id="image">
            <h1 id="hd">{props.title}</h1>
            <img  src ={props.img}/>
          </div>

          <div id="content">
            <p>
            {props.desc}
            </p>
          </div>
        </div>
      
    </div>
  )
}

export default Choice2