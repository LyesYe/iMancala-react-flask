import React, { useState } from 'react'
import './Game2.scss'
import axios from "axios"
function Game2() {

  // const [store1, setStore1] = useState(0);
  // const [store2, setStore2] = useState(0);

  const [turn, setTurn] = useState(1);
  const [move, setMove] = useState('');
  const [steps, setSteps] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const [winner, setWinner] = useState(0);
  


  const [game, setGame] = useState({
    G: 4,
    H: 4,
    I: 4,
    J: 4,
    K: 4,
    L: 4,
    M2: 0,
    A: 4,
    B: 4,
    C: 4,
    D: 4,
    E: 4,
    F: 4,
    M1: 0,
  });

  const computerMove = (game, turn) => {
    console.log("computer move")
    console.log(game)
    console.log(turn)
    console.log('-----------------------------------------------------')

    axios({
      method: "POST",
      url:"/ComputerMove",
      data: {
        game: game,
        turn: turn,
      },
      // data: JSON.stringify({
      //   game: game,
      //   turn: turn,
      // }),
    })
    .then((response) => {
      const data =response.data

      console.log('-----------------------------------------------------')
      console.log("I received")
      console.log(data)





      if (game["A"] == 0 && game["B"] == 0 && game["C"] == 0 && game["D"] == 0 && game["E"] == 0 && game["F"] == 0) {

        // update game
        const b = {
          G: 0,
          H: 0,
          I: 0,
          J: 0,
          K: 0,
          L: 0,
          M2: game["M2"] + game["G"] + game["H"] + game["I"] + game["J"] + game["K"] + game["L"],
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          M1: game["M1"] ,
        };

        setGame(b);
        
        // update winner
        // update winner
        if (game["M1"] < game["M2"]) {
          
          setWinner(-1);
        }else{

          setWinner(1);
        }
        
      }else if (game["G"] == 0 && game["H"] == 0 && game["I"] == 0 && game["J"] == 0 && game["K"] == 0 && game["L"] == 0) {

        // update game
        const b = {
          G: 0,
          H: 0,
          I: 0,
          J: 0,
          K: 0,
          L: 0,
          M2: game["M2"] ,
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          M1: game["M1"] + game["A"] + game["B"] + game["C"] + game["D"] + game["E"] + game["F"],
        };

        setGame(b);
        
        // update winner
        if (game["M1"] < game["M2"]) {
          
          setWinner(-1);
        }else{

          setWinner(1);
        }



      }else {

        
      // update board
      setGame(data.Board);
      // update turn
      setTurn(data.turn);
      // update mouve
      setMove(data.Move);
      // update mouve
      setSteps(data.Steps);
      // // update game over
      // setGameOver(data.gameOver);
      // // update winner
      // setWinner(data.winner);

      if (data.turn == -1) {
        computerMove(data.Board, data.turn)
        
      }

      }







      


    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }






  const getData = (e,key) => {

    if (game[key] != 0) {

      console.log("i sent this state : ")
    console.log(game)
    console.log(key)
    console.log(turn)
    console.log('-----------------------------------------------------')

    axios({
      method: "POST",
      url:"/GameState",
      data: {
        game: game,
        turn: turn,
        move: key,
      },
      // data: JSON.stringify({
      //   game: game,
      //   turn: turn,
      // }),
    })
    .then((response) => {
      const data =response.data
      
      console.log('-----------------------------------------------------')
      console.log("I received")
      console.log(data)


      if (game["A"] == 0 && game["B"] == 0 && game["C"] == 0 && game["D"] == 0 && game["E"] == 0 && game["F"] == 0) {

        // update game
        const b = {
          G: 0,
          H: 0,
          I: 0,
          J: 0,
          K: 0,
          L: 0,
          M2: game["M2"] + game["G"] + game["H"] + game["I"] + game["J"] + game["K"] + game["L"],
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          M1: game["M1"] ,
        };

        setGame(b);
        
        // update winner
        // update winner
        if (game["M1"] < game["M2"]) {
          
          setWinner(-1);
        }else{

          setWinner(1);
        }
        
      }else if (game["G"] == 0 && game["H"] == 0 && game["I"] == 0 && game["J"] == 0 && game["K"] == 0 && game["L"] == 0) {

        // update game
        const b = {
          G: 0,
          H: 0,
          I: 0,
          J: 0,
          K: 0,
          L: 0,
          M2: game["M2"] ,
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          M1: game["M1"] + game["A"] + game["B"] + game["C"] + game["D"] + game["E"] + game["F"],
        };

        setGame(b);
        
        // update winner
        if (game["M1"] < game["M2"]) {
          
          setWinner(-1);
        }else{

          setWinner(1);
        }



      }else {

        
        // update board
      setGame(data.Board);
      // update turn
      setTurn(data.turn);
      
      // // update game over
      // setGameOver(data.gameOver);
      // // update winner
      // setWinner(data.winner);

      if (data.turn == -1) {
        computerMove(data.Board, data.turn)
        
      }

      }

      

      
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

      
    }else{
      console.log("cant move from empty pit")
    }
  
    
    
  }



  return (

    <div className="BigManCon">

      <div className="headcon">

      <div className="turnu">
        <h1>{turn == 1 ? "Player Turn" : "AI Turn"}</h1>
      </div>

      <div className="turnu">
      <h1>Move " {move} " with {steps} steps</h1>
      </div>
      <div className="turnu">
      <h1>winner : {winner == 1 ? "You Won" : "AI Won"}</h1>
      </div>
      </div>

      

      

        <div className="mancalaGrid">
          


          {Object.keys(game).map((pit,index) => (

            (pit === "M1" || pit === "M2") ?
              <div className="mancala-store" id={`${pit}`} key={pit} >{pit} : {game[pit]}</div>
            :
              <div className="mancala-pit" id={`pit-${pit}`} key={pit} onClick={event => getData(event, pit)} >{pit} : {game[pit]}</div>
            

          ))}

        </div>
        
      {/* </div> */}

    </div>
  );
}

export default Game2