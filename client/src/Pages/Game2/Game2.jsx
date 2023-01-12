import React, { useState } from 'react'
import './Game2.scss'
import axios from "axios"
function Game2() {

  // const [store1, setStore1] = useState(0);
  // const [store2, setStore2] = useState(0);

  const [turn, setTurn] = useState(1);

  const [gameOver, setGameOver] = useState(false);

  const [winner, setWinner] = useState(0);
  

  // const [player1, setPlayer1] = useState({
  //   A: 4,
  //   B: 4,
  //   C: 4,
  //   D: 4,
  //   E: 4,
  //   F: 4,
  // });
  // const [player2, setPlayer2] = useState({
  //   A: 4,
  //   B: 4,
  //   C: 4,
  //   D: 4,
  //   E: 4,
  //   F: 4,
  // });

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



  // const board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  // const pits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


  // const onClick = (pit) => {
  //   // send the pit to the server
  //   // get the response of all the states
  //   // update the states

  //   console.log("sent : ")
  //   console.log(game)

  //   fetch("profile", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       pit: pit,
  //       turn: turn,
  //       player1: player1,
  //       player2: player2,
  //       store1: store1,
  //       store2: store2,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // update states
  //       setPlayer1(data.player1);
  //       setPlayer2(data.player2);
  //       // update stores
  //       setStore1(data.store1);
  //       setStore2(data.store2);
  //       // update turn
  //       setTurn(data.turn);
  //       // update game over
  //       setGameOver(data.gameOver);
  //       // update winner
  //       setWinner(data.winner);
  //     });




  //     console.log("recieved : ")
  //     console.log(game)

  // };


  // const [profileData, setProfileData] = useState(null)

  const getData = () => {

    console.log("sent : ")
    console.log(game)

    axios({
      method: "POST",
      url:"/GameState",
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
      
      console.log("done")

      // update board
      // setGame(data.game);
      // update turn
      // setTurn(data.turn);
      // // update game over
      // setGameOver(data.gameOver);
      // // update winner
      // setWinner(data.winner);

      console.log("recieved : ")
      console.log(data)
      
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  
    
  }



  return (

    <div className="BigManCon">

      <div className="mancala-board">

        

        <div className="mancalaGrid">
          


          {Object.keys(game).map((pit) => (

            (pit === "M1" || pit === "M2") ?
              <div className="mancala-store" key={pit} >{pit} : {game[pit]}</div>
            :
              <div className="mancala-pit" key={pit} onClick={getData} >{pit} : {game[pit]}</div>
            

          ))}

        </div>
        
      </div>

    </div>
  );
}

export default Game2