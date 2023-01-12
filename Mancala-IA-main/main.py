import pygame
import time
from pygame import gfxdraw
from MancalaBoard import State
from MancalaNode import Node
from MancalaPlay import Play
from MancalaButton import Button

pygame.init()
pygame.font.init()

WIDTH = 1280
HEIGHT = 720
DEPTH = 5
RAYON = 30
COLOR = (255, 255, 255)
STORE_COLOR = (0, 170, 255)
POS = 170

launch = True
surface = pygame.display.set_mode((WIDTH, HEIGHT))
asset = pygame.image.load("./assets/background.png").convert_alpha()
asset = pygame.transform.scale(asset, (WIDTH, HEIGHT))
surface.blit(asset, (0, 0))

image_buttons = []
buttons_letter_p1 = []
buttons_letter_p2 = []
index_2 = 0

for letter in "ABCDEFGHIJKL":
    image = pygame.image.load(
        f"./assets/letter_{letter}.png").convert_alpha()
    image_buttons.append(image)

for index, image in enumerate(image_buttons):
    if index < 6:
        buttons_letter_p1.append(Button(POS+index*POS, 600, image, 0.5))
    else:
        buttons_letter_p2.append(Button(POS+index_2*POS, 600, image, 0.5))
        index_2 += 1


pygame.display.set_caption("Mancala Game")
pygame.display.flip()


def show_dict_board(board: dict):
    print("-----------------------\n")
    for key, value in board.items():
        if key != "G":
            print(f"[{key}]={value}", end=" ")
        else:
            print("\n")
            print(f"[{key}]={value}", end=" ")
    print("\n-----------------------\n")


def print_text(surface, text, x=515, y=130, couleur=COLOR, size_police=25):
    text_font = pygame.font.SysFont("Comic Sans MS", size_police)
    text_render = text_font.render(text, False, couleur)
    surface.blit(text_render, (x, y))


def draw_store(surface, position, value):
    x, y = position
    rect = pygame.Rect(position, (100, 300))
    pygame.draw.rect(surface, COLOR, rect,  1, 10)
    print_text(surface, f"{value}", x+35, y+100, COLOR, 50)


def draw_circle(surface, position, key, value):
    x, y = position
    gfxdraw.aacircle(surface, x, y, RAYON, COLOR)
    # gfxdraw.filled_circle(surface, x, y, RAYON, COLOR)
    print_text(surface, f"{key}", x-5, y+RAYON*1.5, COLOR, 20)
    print_text(surface, f"{value}", x-6, y-12, STORE_COLOR, 20)


def draw_board(surface, board: dict, current_player, launch):

    x = WIDTH//4
    y = HEIGHT//3
    xs = 150
    ys = 200

    if launch:
        value = "Computer is playing..." if current_player == 1 else "Human, it's your turn"
        print_text(surface, value, 515, 50)

    for key, value in board.items():
        if key not in {"M2", "M1"}:
            position = (x, y)
            draw_circle(surface, position, key, value)
            x += 130
            if key == "L":
                x = WIDTH//4
                y += 200
        else:
            position_store = (xs, ys)
            draw_store(surface, position_store, value)
            xs += 900


Game = Play()
init_state = State()
current_player = 1
mouvement_to_play = None

human = False
player_1 = "MCTS"
player_2 = "Human"
who_won = "no one, it's a draw"
computer_side = 1


MCTS_DEPTH = 6
MINMAX_DEPTH = 6

# show_dict_board(init_state.board_game)
draw_board(surface, init_state.board_game, current_player, launch)
pygame.display.flip()

while launch:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            launch = False

    if current_player == computer_side:
        print(f"Computer {player_1} is playing...")
        current_noeud = Node(init_state, current_player,
                             None, old_player=current_player)
        if human:
            time.sleep(2)
        current_player, init_state = Game.computer_turn(
            init_state, current_noeud, current_player, ANN=True, MCTS=False, DEPTH=MCTS_DEPTH, heuristic=1, MINMAX=True)

    else:
        if human:
            if mouvement_to_play != None and mouvement_to_play in init_state.possible_moves(-1):
                current_player, init_state = Game.human_turn(
                    init_state, current_player, mouvement_to_play)
                mouvement_to_play = None
        else:
            print(f"Computer {player_2} is playing...")
            current_noeud = Node(init_state, current_player,
                                 None, old_player=current_player)
            current_player, init_state = Game.computer_turn(
                init_state, current_noeud, current_player, ANN=False, MCTS=False, DEPTH=MINMAX_DEPTH, heuristic=1, MINMAX=True)

    if init_state.game_over():
        winner = init_state.find_winner()
        if winner > 0:
            # print("Human won !")
            print(f"Computer {player_1} won")
            who_won = f"The winner is {player_1}"
        elif winner < 0:
            print("Human won !")
            # print(f"Computer {player_2} won")
            who_won = f"The winner is {player_2}"
        else:
            print("Draw !")
            who_won = "It's a draw !"

        launch = False
        pygame.display.flip()

    # show_dict_board(init_state.board_game)
    asset = pygame.transform.scale(asset, (WIDTH, HEIGHT))
    surface.blit(asset, (0, 0))
    draw_board(surface, init_state.board_game, current_player, launch)

    if current_player == -1 and launch and human:
        if buttons_letter_p2[0].draw(surface):
            mouvement_to_play = "G"
        if buttons_letter_p2[1].draw(surface):
            mouvement_to_play = "H"
        if buttons_letter_p2[2].draw(surface):
            mouvement_to_play = "I"
        if buttons_letter_p2[3].draw(surface):
            mouvement_to_play = "J"
        if buttons_letter_p2[4].draw(surface):
            mouvement_to_play = "K"
        if buttons_letter_p2[5].draw(surface):
            mouvement_to_play = "L"

    pygame.display.flip()

    if not launch:
        print_text(surface, f"{who_won}", couleur=STORE_COLOR, y=90)
        pygame.display.flip()
        time.sleep(15)
