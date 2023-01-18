import React from 'react'
import './Choose.scss'
import Choice from './Choice/Choice.jsx'
import img1 from '../../Assets/aiVSai.png'
import img2 from '../../Assets/humanVSai.png'
import Choice2 from './Choice2/Choice2'




function Choose() {





  return (
    <div id="conChoose">
      
      <h1  id="title">Choose Your Way!</h1>
      
      <div id="choices">
        {/* <Choice title="AI vs AI" img={img1}/>
        <Choice title="Human vs AI" img={img2}/> */}
        <Choice2 link="/gameAI" title="AI vs AI" img={img1} desc="In our case , we will put MinMax algorithm with basic heuristic VS the Monte Carlo heuristic"/>
        <Choice2 link="/settings" title="Human vs AI" img={img2} desc="You can test your skills against our Monte Carlo heuristic , can you beat it ?"/>
      </div>

    </div>
  )
}

export default Choose