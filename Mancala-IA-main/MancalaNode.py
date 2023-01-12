import random
import tensorflow as tf
import numpy as np
from copy import deepcopy
from MancalaBoard import State
from tensorflow.keras.models import load_model

model = load_model('./model/model.h5')

MCTS_ITERATIONS = 600


class Node:

    def __init__(self, state: State, current_player, parent=None, mouvement="", old_player=None):

        self.ranking = 0
        self.old_player = old_player
        self.player_side = current_player
        self.state = state
        self.value = None
        self.alpha = float('-inf')
        self.beta = float('inf')
        self.parent = parent
        self.best_path = None
        self.mouvement_to_child = mouvement if mouvement != "" else self.state.possible_moves(current_player)[
            random.randint(0, len(self.state.possible_moves(current_player))-1)]
        self.heuristics = {
            1: self.heuristic_1,
            2: self.heuristic_2,
            3: self.herusitic_3,
        }

    def successeurs(self):
        succ = []
        for m in self.state.possible_moves(self.player_side):
            child = deepcopy(self.state)
            current_player = child.do_move(m, self.player_side)
            node_child = Node(child, current_player,
                              self, mouvement=m, old_player=self.player_side)
            node_child.ranking = node_child.evaluate(
                neural_network=False, monte_carlo=False, heuristic=1)
            succ.append(node_child)

        # ----- MOVE ORDERING
        succ = sorted(succ, key=lambda x: x.ranking,
                      reverse=self.player_side == 1)
        return succ

    def random_turn(self, Game: State, current_player):
        if len(Game.possible_moves(current_player)) > 0:
            moves = Game.possible_moves(current_player)
            move = moves[random.randint(0, len(moves)-1)]
            current_player = Game.do_move(move, current_player)
            return current_player, Game

    def end_game_since(self):
        node_copy = deepcopy(self)
        game = node_copy.state
        current_player = node_copy.player_side
        while not game.game_over():
            current_player, game = self.random_turn(game, current_player)

        winner = game.find_winner()

        if winner < 0:
            return -1
        elif winner > 0:
            return 1
        else:
            return 0

    def create_array(self) -> np.ndarray:
        board_array = []
        for values in self.state.board_game.values():
            board_array.append(values)

        board_np_array = np.array(board_array)
        board_np_array = board_np_array.reshape(-1, 2, 7)
        return board_np_array

    def ANN(self):
        state_array = self.create_array()
        state_array = 2*np.array(
            (state_array-state_array.min())/(state_array.max()-state_array.min()))-1
        evaluation = model(state_array)[0][0]
        evaluation_value = tf.keras.backend.get_value(evaluation)
        return evaluation_value

    def MCTS(self, mcts_iteration=MCTS_ITERATIONS):
        gain = 0
        for _ in range(mcts_iteration):
            winner = self.end_game_since()
            if winner == self.player_side:
                gain += 1

        FMKS = gain
        return FMKS

    def herusitic_3(self):
        pass

    def heuristic_2(self):
        max_store = self.state.board_game["M1"]
        min_store = self.state.board_game["M2"]

        somme_max = 0
        somme_min = 0
        weight = 10

        for key, value in self.state.board_game.items():
            if key in self.state.possible_moves(1):
                somme_max += value
            elif key in self.state.possible_moves(-1):
                somme_min += value

        evaluation = (weight*max_store + somme_max) - \
            (weight*min_store + somme_min)
        return evaluation

    def heuristic_1(self):
        return self.state.board_game["M1"] - self.state.board_game["M2"]

    def evaluate(self, neural_network=False, monte_carlo=False, heuristic=1, mcts_iteration=MCTS_ITERATIONS):
        if not monte_carlo and not neural_network:
            return self.heuristics[heuristic]()
        elif neural_network == True:
            return self.ANN()
        else:
            weight = (mcts_iteration//2)
            short_term_strategy = self.heuristics[heuristic]()
            long_term_strategy = self.MCTS(mcts_iteration)

            return weight*short_term_strategy+long_term_strategy
