import React from 'react'
import './Choice.scss'

function Choice(props) {
  return (
    <a id="linkury" href="/game"> 
    <div id="ConChoice">
        <h1 id="hd">{props.title}</h1>
        
        <img id="img" src={props.img} alt="img"/>
        
    </div>
    </a>
  )
}

export default Choice