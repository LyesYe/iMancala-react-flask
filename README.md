# iMancala-react-flask

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
