import time
from MancalaNode import Node

MAX = 1
STEP = 0
TIME_MAX = 10


class Search:

    @staticmethod
    def MiniMaxAlphaBeta(noeud: Node, depth, player, alpha, beta, ANN=False, MCTS=False, heuristic=1, max_time=0) -> tuple:
        global STEP
        STEP += 1
        noeud.alpha = alpha
        noeud.beta = beta

        # if depth == 1 or noeud.state.game_over():
        if depth == 1 or noeud.state.game_over() or time.time()-max_time > TIME_MAX:
            value = noeud.evaluate(
                neural_network=ANN, monte_carlo=MCTS, heuristic=heuristic)
            noeud.value = value
            noeud.best_path = noeud
            return noeud, STEP

        else:
            succ_childs = noeud.successeurs()
            best_node = None

            if player == MAX:
                best_value = float('-inf')

                for child in succ_childs:
                    Search.MiniMaxAlphaBeta(
                        child, depth-1, child.player_side, alpha, beta, ANN, MCTS, heuristic, max_time)
                    if child.value > best_value:
                        best_value = child.value
                        best_node = child

                    if alpha < best_value:
                        alpha = best_value
                        noeud.alpha = alpha

                    if best_value >= beta:
                        break
            else:
                best_value = float('inf')

                for child in succ_childs:
                    Search.MiniMaxAlphaBeta(
                        child, depth-1, child.player_side, alpha, beta, ANN, MCTS, heuristic, max_time)
                    if child.value < best_value:
                        best_value = child.value
                        best_node = child

                    if beta > best_value:
                        beta = best_value
                        noeud.beta = beta

                    if best_value <= alpha:
                        break

            noeud.value = best_value
            noeud.best_path = best_node
            return noeud, STEP

    @ staticmethod
    def NegaMaxAlphaBeta(noeud: Node, depth, player, alpha, beta, ANN=False, MCTS=False, heuristic=1, max_time=0) -> tuple:
        global STEP
        STEP += 1
        noeud.alpha = alpha
        noeud.beta = beta

        if depth == 1 or noeud.state.game_over() or time.time()-max_time > TIME_MAX:
            value = noeud.evaluate(
                neural_network=ANN, monte_carlo=MCTS, heuristic=heuristic)
            noeud.value = value
            if player != MAX:
                noeud.value = -value

            noeud.best_path = noeud
            return noeud, STEP

        else:
            best_value = float('-inf')
            succ_childs = noeud.successeurs()
            best_node = None

            for child in succ_childs:
                Search.NegaMaxAlphaBeta(
                    child, depth-1, -player, -beta, -alpha, ANN, MCTS, heuristic, max_time)
                if -child.value > best_value:
                    best_value = -child.value
                    best_node = child
                if best_value > alpha:
                    alpha = best_value
                    noeud.alpha = alpha

                if beta <= alpha:
                    break

            noeud.value = best_value
            noeud.best_path = best_node
            return noeud, STEP
