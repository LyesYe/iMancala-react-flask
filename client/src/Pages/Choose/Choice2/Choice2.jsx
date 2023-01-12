import React from 'react'
import './Choice2.scss'
function Choice2(props) {
  return (
    <a id="linkury" href="/game"> 
      
      
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
      
    </a>
  )
}

export default Choice2