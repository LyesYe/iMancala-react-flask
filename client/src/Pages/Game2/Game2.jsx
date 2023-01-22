import React, { useState } from 'react'
import './Game2.scss'
import axios from "axios"
import { useLocation } from 'react-router-dom';

function Game2() {
  
  // const [store1, setStore1] = useState(0);
  // const [store2, setStore2] = useState(0);
  
  const [turn, setTurn] = useState(1);
  const [move, setMove] = useState('');
  const [steps, setSteps] = useState(0);
  // const [settings, setSettings] = useState();
  
  const [gameOver, setGameOver] = useState(false);
  
  const [winner, setWinner] = useState(0);
  
  console.log( `winner = ${winner}`)
  const location = useLocation();
  //the data here will be an object since an object was
  const datax = location.state;
  console.log(datax);

  


  const [settings, setSettings] = useState({
    ANN : false,
    MCTS : false,
    DEPTH : 0,
    heuristic : 0, 
    MINMAX : false
  });

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


  async function test ( game , turn , seti){

    console.log("WE in test")
    console.log(game)
    console.log(turn)

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

      console.log("my pits are zero")

      
      // update winner
      // update winner
      if (b["M1"] < b["M2"]) {
        console.log("winner -1")
        setWinner(-1);
      }else{
        console.log("winner 1")
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
      console.log("his pits are zero")
      
      // update winner
      if (b["M1"] < b["M2"]) {
        console.log("winner -1")
        setWinner(-1);
      }else{
        console.log("winner 1")
        setWinner(1);
      }



    }else {


    if (turn == -1) {
      console.log("turn -1")
      computerMove(game,turn,seti)
      
    }

    }

  }



  async function computerMove (game,turn ,seti){
    console.log("computer move")
    console.log(game)
    console.log(turn)
    console.log(seti)
    console.log('-----------------------------------------------------')


    if (winner == 0)
    {
      const response = await axios({
        method: "POST",
        url:"/ComputerMove",
        data: {
          game: game,
          turn: turn,
          seti: seti,
        },
      })
  
      try 
      {  
        const data =response.data
  
        console.log('-----------------------------------------------------')
        console.log("I received")
        console.log(data)

        // update board
        setGame(data.Board);
        // update turn
        setTurn(data.turn);
        // update mouve
        setMove(data.Move);
        // update mouve
        setSteps(data.Steps);


        // const ti = setTimeout(() => {
        //   test()
        // }, 1000);

        const ti = await test(data.Board , data.turn , seti)

  
      }
      catch (error) 
      {
        
        console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
  
  
      }
    }

    

  }






  async function getData (e,key,seti) {

    

    if (game[key] != 0 && turn == 1 && winner == 0) {

    // console.log(seti)
    console.log("i sent this state : ")
    console.log(game)
    console.log(key)
    console.log(turn)
    // console.log(settings)
    console.log(seti)
    console.log('-----------------------------------------------------')


    
    const response = await  axios({
      method: "POST",
      url:"/GameState",
      data: {
        game: game,
        turn: turn,
        move: key,
        setting: seti ,
      },

    })
   
    try {
      
      const data =response.data
      
      console.log('-----------------------------------------------------')
      console.log("I received")
      console.log(data)

      // update board
      setGame(data.Board);
      // update turn
      setTurn(data.turn);

      const ti = await test(data.Board , data.turn , seti)



    } catch (error) {
      
      console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)


    }
      
    

      
    }else{
      console.log("cant move from empty pit")
    }
  
    
    
  }




  return (

    <div id="BigManCon">

      <div className="headcon">

      <div className="turnu" id={winner == 0 ? turn == 1 ? "pi" : "lo" : "winner" } >
        <h1>{turn == 1 ? "Player Turn" : "AI Turn"}</h1>
      </div>

      <div className="turnu" id={winner == 0 ? "lo" : "winner" } >
      <h1>Move " {move} " with {steps} steps</h1>
      </div>
      
      {
        <div className="turnu" id={winner == 0 ? "lo" : "winner1" } >
          <h1>{winner == 0 ? "Game Playing..." : winner == 1 ? "You Won" : "AI Won"}</h1>
        </div>


      }
      
      </div>

      

      

        <div className="mancalaGrid">
          


          {Object.keys(game).map((pit,index) => (


            (pit === "M1")  ?
              <div className={winner==1 ? "win" : "mancala-store"} id={`${pit}`} key={pit} >{pit} : {game[pit]}</div>
            :
            (pit === "M2")  ?
              <div className={winner==-1 ? "win" : "mancala-store"} id={`${pit}`} key={pit} >{pit} : {game[pit]}</div>
            :
              <div className={move == pit ? "mancala-pit-" :"mancala-pit"} id={`pit-${pit}`} key={pit}   onClick= {pit === "A" || pit === "B" || pit === "C" || pit === "D" || pit === "E" || pit === "F" ? (e) => getData(e,pit,datax) : console.log("HAHA")} >
                {pit} : {game[pit]}
                </div>
            

          ))}

        </div>
        
      {/* </div> */}

    </div>
  );
}

export default Game2