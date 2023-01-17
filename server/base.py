from flask import Flask,request
# from flask.ext.cors import CORS, cross_origin
# from flask_cors import CORS, cross_origin

from MancalaBoard import State
from MancalaNode import Node
from MancalaPlay import Play

settings = {
    "ANN" : False, 
    "MCTS" : False, 
    "DEPTH" : 12, 
    "heuristic" : 1, 
    "MINMAX" : False
}

api = Flask(__name__)

@api.route('/GameState',methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def my_profile():
    gameData = request.get_json()

    # Printing data we got
    print("Printing data we got for player")
    print(gameData["game"])
    print(gameData["turn"])
    print(gameData["move"])
    
    # var declarations
    
    init_state = State(gameData["game"])
    current_player = gameData["turn"]
    current_move = gameData["move"]
    
    # classes
    Game = Play()
    
    # current_noeud = Node(init_state, current_player,None, old_player=current_player)
    
    new_player, new_state = Game.human_turn(init_state, current_player,current_move)
    
    
    #print result 
    print(new_state.board_game)
    
    ret = {
        "Board" : new_state.board_game,
        "turn" : new_player,
    }
    
    return ret


@api.route('/ComputerMove',methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def AImove():
    gameData = request.get_json()

    # Printing data we got
    print("Printing data we got for ai")
    print(gameData["game"])
    print(gameData["turn"])
    # print(gameData["move"])
    
    # var declarations
    
    init_state2 = State(gameData["game"])
    current_player2 = gameData["turn"]
    # current_move2 = gameData["move"]
    current_noeud = Node(init_state2, current_player2,None, old_player=current_player2)
    
    # classes
    Game = Play()
        
    
    
    # mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2)
    
    
    mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,settings)
    
    #print result 
    print(new_state2.board_game)
    
    ret = {
        "Board" : new_state2.board_game,
        "turn" : new_player2,
        "Move" : mouv2,
        "Steps" : steps,
    }
    
    return ret


    
# Game = Play()
    
    # init_state = State(gameData["game"])
    
    # current_noeud = Node(init_state, current_player,None, old_player=current_player)
    
    # mouv,new_player, new_state = Game.computer_turn(init_state, current_noeud, current_player)
    
    # print(new_state.board_game)
    # print(mouv)