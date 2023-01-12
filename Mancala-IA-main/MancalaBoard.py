
NUMBER_OF_SEEDS = 4


class State:
    def __init__(self, board_game=None) -> None:

        self.STORES = {"M1", "M2"}
        self.PLAYER_ONE = ("A", "B", "C", "D", "E", "F")
        self.PLAYER_TWO = ("G", "H", "I", "J", "K", "L")
        self.PLAYER_STORE = {
            1: "M1",
            -1: "M2"
        }

        self.board_game = {
            "G": NUMBER_OF_SEEDS,
            "H": NUMBER_OF_SEEDS,
            "I": NUMBER_OF_SEEDS,
            "J": NUMBER_OF_SEEDS,
            "K": NUMBER_OF_SEEDS,
            "L": NUMBER_OF_SEEDS,
            "M2": 0,
            "A": NUMBER_OF_SEEDS,
            "B": NUMBER_OF_SEEDS,
            "C": NUMBER_OF_SEEDS,
            "D": NUMBER_OF_SEEDS,
            "E": NUMBER_OF_SEEDS,
            "F": NUMBER_OF_SEEDS,
            "M1": 0,
        } if board_game == None else board_game

    def total_seed(self):
        somme = 0
        for value in self.board_game.values():
            somme += value
        return somme

    def next_move(self, element, step):
        return chr((ord(element)+step))

    def do_move(self, element, player):
        seed = 1
        max_seed = self.board_game[element]+1
        current_element = element
        last_move = None
        current_moves = self.PLAYER_ONE if player == 1 else self.PLAYER_TWO
        current_store = self.PLAYER_STORE[player]

        if element in current_moves:
            self.board_game[element] = 0
            while seed < max_seed:
                if current_element == "F" and player == 1:
                    current_element = "M1"
                elif current_element == "F" and player == -1:
                    current_element = "L"
                elif current_element == "G" and player == -1:
                    current_element = "M2"
                elif current_element == "G" and player == 1:
                    current_element = "A"
                elif current_element == "M2":
                    current_element = "A"
                elif current_element == "M1":
                    current_element = "L"
                else:
                    step = -1 if current_element in {
                        "H", "I", "J", "K", "L"} else 1
                    current_element = self.next_move(current_element, step)

                self.board_game[current_element] += 1
                last_move = current_element
                seed += 1

            if self.board_game[last_move]-1 == 0 and last_move not in self.STORES and last_move in current_moves:
                opposit_pit = 6 if player == 1 else -6
                opposit_move = chr(ord(last_move)+opposit_pit)

                if self.board_game[opposit_move] > 0:
                    self.board_game[current_store] += (
                        self.board_game[opposit_move]+1)
                    self.board_game[opposit_move] = 0
                    self.board_game[last_move] = 0

                return -player
            elif last_move == self.PLAYER_STORE[player]:
                return player
            else:
                return -player

        else:
            return player

    def possible_moves(self, player):
        moves = []
        current_moves = self.PLAYER_ONE if player == 1 else self.PLAYER_TWO
        for element in current_moves:
            if self.board_game[element] > 0:
                moves.append(element)
        return moves

    def game_over(self):
        possible_move_p1 = self.possible_moves(1)
        possible_move_p2 = self.possible_moves(-1)

        if len(possible_move_p1) < 1:
            for moves in possible_move_p2:
                self.board_game["M2"] += self.board_game[moves]
            return True
        elif len(possible_move_p2) < 1:
            for moves in possible_move_p1:
                self.board_game["M1"] += self.board_game[moves]
            return True
        return False

    def find_winner(self):
        return self.board_game["M1"] - self.board_game["M2"]
