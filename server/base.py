from flask import Flask,request
# from flask.ext.cors import CORS, cross_origin
# from flask_cors import CORS, cross_origin

from MancalaBoard import State
from MancalaNode import Node
from MancalaPlay import Play



settings = {
    "ANN" : False,
    "MCTS" : False,
    "DEPTH" : 6,
    "heuristic" : 1, 
    "MINMAX" : True
}
settings2 = {
    "ANN" : False,
    "MCTS" : False,
    "DEPTH" : 6,
    "heuristic" : 3, 
    "MINMAX" : True
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
    print(gameData["setting"])
    
    # var declarations
    
    init_state = State(gameData["game"])
    current_player = gameData["turn"]
    current_move = gameData["move"]
    
    # classes
    Game = Play()
    
    # current_noeud = Node(init_state, current_player,None, old_player=current_player)
    # print("--------------------------------------------------------------")
    # print(gameData["setting"])
    # # print(settings2)
    # print("--------------------------------------------------------------")
    
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
    print(gameData["seti"])
    # print(gameData["move"])
    
    # var declarations
    
    init_state2 = State(gameData["game"])
    current_player2 = gameData["turn"]
    # current_move2 = gameData["move"]
    current_noeud = Node(init_state2, current_player2,None, old_player=current_player2)
    
    # classes
    Game = Play()
        
    
    
    # mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2)
    
    
    mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,gameData["seti"])
    
    
    #print result 
    print(new_state2.board_game)
    
    ret = {
        "Board" : new_state2.board_game,
        "turn" : new_player2,
        "Move" : mouv2,
        "Steps" : steps,
    }
    
    return ret


@api.route('/Computer1',methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def AIvsAI():
    gameData = request.get_json()

    # Printing data we got
    print("Printing data we got for ai")
    print(gameData["game"])
    print(gameData["turn"])
    print(gameData["seti1"])
    print(gameData["seti2"])
    
    # var declarations
    
    init_state2 = State(gameData["game"])
    current_player2 = gameData["turn"]

    current_noeud = Node(init_state2, current_player2,None, old_player=current_player2)
    
    # classes
    Game = Play()
        
    
    
    # mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2)
    
    if (current_player2 == 1):
            mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,gameData["seti1"])
    else:
            mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,gameData["seti2"])

    
    
    #print result 
    print(new_state2.board_game)
    
    ret = {
        "Board" : new_state2.board_game,
        "turn" : new_player2,
        "Move" : mouv2,
        "Steps" : steps,
    }

    
    return ret


@api.route('/compVScomp',methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def AImoveYe():
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
    
    if current_player2 == 1:
        mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,settings)
    else:
        mouv2,new_player2, new_state2 , steps = Game.computer_turn(init_state2, current_noeud, current_player2,settings2)
        
        
    
    
    #print result 
    print(new_state2.board_game)
    print(new_player2)
    
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