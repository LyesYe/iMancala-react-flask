
from MancalaSearch import Search
from MancalaBoard import State
from MancalaNode import Node


class Play:

    def human_turn(self, Game: State, current_player, move):
        current_player = Game.do_move(move, current_player)
        return current_player, Game

    def computer_turn(self, Game: State, Noeud: Node, current_player, ANN=False, MCTS=False, DEPTH=6, heuristic=1, MINMAX=False):
        if len(Game.possible_moves(current_player)) > 0:
            if MINMAX:
                best_node, STEP = Search.MiniMaxAlphaBeta(
                    Noeud, DEPTH, current_player, Noeud.alpha, Noeud.beta, ANN, MCTS, heuristic)

            else:
                best_node, STEP = Search.NegaMaxAlphaBeta(
                    Noeud, DEPTH, current_player, Noeud.alpha, Noeud.beta, ANN, MCTS, heuristic)

            print(
                f"Computer move : [{ best_node.best_path.mouvement_to_child}] in {STEP} steps")
            current_player = Game.do_move(
                best_node.best_path.mouvement_to_child, current_player)
            return current_player, Game
