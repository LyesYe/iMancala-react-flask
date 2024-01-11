# iMancala-react-flask


Welcome to the Mancala Web Game! This project brings the classic Mancala board game to your web browser, offering an immersive 1 vs 1 mode and a challenging 1 vs AI mode.

# Features
* **Two Modes:** Engage in a thrilling head-to-head battle with a friend or challenge yourself against a sophisticated AI opponent.
Intuitive Gameplay: Experience the simplicity of Mancala with a user-friendly interface, making it easy for players of all levels to jump in and enjoy.
* **AI Heuristics:** The AI opponent uses advanced heuristics to provide a dynamic and strategic gaming experience. It's not just a game; it's a mental workout!
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
**- 1 :** Player_1_Store - Player_2_Store
**- 2 :** Player_1_Store + sum of its pits - Player_2_Store + sum of its pits
**- 3 :** Heuristic 1 * weight + Heuristic 2 * weight + number of possible moves for Player 1 - for Player 2
**- 4 :** Heuristic 2 + weight (if Player 1 gets a second turn)




# Results 

## Heuristic 1 vs Heuristic 2:
- Depth 10: Draw
- Depth 5: Heuristic 2 Wins
## Heuristic 1 vs Heuristic 3:
- Depth 10: Draw
- Depth 5: Heuristic 3 Wins
## Heuristic 2 vs Heuristic 3:
- Depth 10: Draw
- Depth 5: Draw
## Heuristic 2 vs MCTS(2):
- Depth 10: Heuristic 2 Wins
- Depth 5: Heuristic 2 Wins (Draw + Win)
## Heuristic 2 vs ANN:
- Depth 10: Heuristic 2 Wins
- Depth 5: Draw
## Heuristic 2 vs Heuristic 4:
- Depth 10: Heuristic 4 Wins
- Depth 5: Heuristic 2 Wins
