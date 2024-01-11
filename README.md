# iMancala-react-flask


Welcome to the Mancala Web Game! This project brings the classic Mancala board game to your web browser, offering an immersive 1 vs 1 mode and a challenging 1 vs AI mode.

# Features
## **Two Modes:** Engage in a thrilling head-to-head battle with a friend or challenge yourself against a sophisticated AI opponent.
Intuitive Gameplay: Experience the simplicity of Mancala with a user-friendly interface, making it easy for players of all levels to jump in and enjoy.
## **AI Heuristics:** The AI opponent uses advanced heuristics to provide a dynamic and strategic gaming experience. It's not just a game; it's a mental workout!
Responsive Design: Play seamlessly across devices, from desktops to tablets and smartphones.


# Game Rules:

- The game consists of a board with two rows, each containing six small pits, and a Mancala pit on the right for each player.
- Players take turns choosing a pit from their row.
- The player collects all the stones from the chosen pit and distributes them counterclockwise into subsequent pits, including their Mancala but excluding the opponent's Mancala.
- If the last stone lands in the player's Mancala, they get another turn.
- If the last stone lands in an empty pit on their side, and the opposite pit has stones, the player captures all the stones in the opponent's pit and their own, placing them in their Mancala.
- The game continues until one player's row is empty, and the remaining stones on the opponent's side are then captured by the player who still has stones in their pits.
- The winner is the player with the most stones in their Mancala.

# HOW TO RUN ?

Executer les commandes Suivantes : 

## 1st Terminal

```js
cd ./client  

npm install  

npm start

```


## 2nd Terminal
 
```py 
cd ./server

python -m venv env

.\env\Scripts\activate

pip install flask

pip install python-dotenv

pip install tensorflow

flask run

```



# Heuristics
 - 1 : Magasin joueur 1 - Magasin joueur 2
 - 2 : Magasin joueur 1 + somme de ses pits - Magasin joueur 2 + sommes de ses pits
 - 3 : Heuristic 1 * poids + heurtitic 2 * poids + nombre_mouvement possible joueur 1 - joueur 2 
 - 4 : Heuristic 2 + poids si on joueur 1 rejoue une deuxiÃ¨me fois




# Results 

## heuristic 1 vs heuristic 2 
- DEPTH 10 - EGALITE 
- DEPTH 5 - 2 WON

## heuristic 1 vs heuristic 3
- DEPTH 10 - EGALITE 
- DEPTH 5 -  3 WON 

## heuristic 2 vs heuristic 3
- DEPTH 10 - EGALITE 
- DEPTH 5 -  EGALITE

## heuristic 2 vs  MCTS(2)
- DEPTH 10 - 2 WON
- DEPTH 5 - 2 WON (DRAW + WON)

## heuristic 2 vs  ANN
- DEPTH 10  - 2 WON
- DEPTH 5 - EGALITE

## heuristic 2 vs heuristic 4 
- DEPTH 10 - 4 won
- DEPTH 5 -  2 won 
