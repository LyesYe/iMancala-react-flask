import random
import numpy as np
import time
import tensorflow as tf
import matplotlib.pyplot as plt

from MancalaNode import Node
from MancalaBoard import State

from tensorflow.keras import layers
from tensorflow.keras.optimizers import Adam, SGD, RMSprop
from tensorflow.keras.models import Model


FILE = "model_nn.h5"
TRAIN = True
CREATE = False
EPOCHS = 1000
BATCH_SIZE = 256
GENERATED_GAME = 150000


def show_dict_board(board: dict):
    print("-----------------------\n")
    for key, value in board.items():
        if key != "G":
            print(f"[{key}]={value}", end=" ")
        else:
            print("\n")
            print(f"[{key}]={value}", end=" ")
    print("\n-----------------------\n")


def constrained_sum_sample_pos(n, total):
    """Return a randomly chosen list of n positive integers summing to total.
    Each such list is equally likely to occur."""

    dividers = sorted(random.sample(range(0, total), n - 1))
    return [a - b for a, b in zip(dividers + [total], [0] + dividers)]


def reconstruct_games(array: np.ndarray) -> list:
    game_nodes = []
    board: np.ndarray
    board_state = {}

    for board in array:
        print(board)
        for rows in board:
            print(board.shape)
            print(rows)

        random_player = 1
        if random.randint(0, 1) == 0:
            random_player = -1

        new_state = State(board_game=board_state)
        new_node = Node(new_state, random_player,
                        None, old_player=random_player)
        game_nodes.append(new_node)

    return game_nodes


def generate_games(GAMES_GENERATED=10):
    games_node = []
    games_generated = []
    i = 0

    while i < GAMES_GENERATED:
        random_board_game = {}
        pit_values = constrained_sum_sample_pos(14, 48)

        for element, value in zip(["G", "H", "I", "J", "K", "L", "M2", "A", "B", "C", "D", "E", "F", "M1"], pit_values):
            random_board_game[element] = value

        random_player = 1
        if random.randint(0, 1) == 0:
            random_player = -1

        if random_board_game not in games_generated:
            new_state = State(board_game=random_board_game)
            new_node = Node(new_state, random_player,
                            None, old_player=random_player)
            games_node.append(new_node)
            games_generated.append(random_board_game)
            i += 1
            print(i)

    print(f"{GAMES_GENERATED} Games have been generated")
    return games_node


def evaluate_game(games_nodes):
    for node in games_nodes:
        evaluation = node.evaluate(
            neural_network=False, monte_carlo=False, heuristic=2, mcts_iteration=1000)
        node.ranking = evaluation

    print(f"{len(games_nodes)} Nodes have been evaluated")

    return games_nodes


def create_array(board: dict) -> np.ndarray:
    board_array = []
    for values in board.values():
        board_array.append(values)

    board_np_array = np.array(board_array)
    board_np_array = board_np_array.reshape(2, 7, 1)
    return board_np_array


def normalize(array: np.ndarray, type=1, type_on=1) -> np.ndarray:
    if type == 1:
        return np.array((array-array.min())/(array.max()-array.min()), dtype=np.float32)
    elif type == 2:
        return 2*np.array((array-array.min())/(array.max()-array.min()), dtype=np.float32)-1
    else:
        return np.array([normalize(arr, type=type_on) for arr in array])


def create_dataset(games_evals):

    games_dataset = []
    labels_dataset = []

    for node in games_evals:
        state_array = create_array(node.state.board_game)
        games_dataset.append(state_array)
        labels_dataset.append(node.ranking)

    labels_dataset = np.array(labels_dataset)

    return np.array(games_dataset), labels_dataset


def mancala_model_two():

    board = layers.Input(shape=(2, 7, 1))
    x = layers.Flatten(name="flatten")(board)
    x = layers.Dense(256)(x)
    x = layers.ReLU()(x)
    x = layers.Dense(128)(x)
    x = layers.ReLU()(x)
    x = layers.Dropout(0.5)(x)
    x = layers.Dense(1, 'linear')(x)

    return Model(inputs=board, outputs=x)


def mancala_model(conv_size, conv_depth):
    board = layers.Input(shape=(2, 7, 1))

    x = layers.Conv2D(filters=conv_size, kernel_size=3,
                      padding='same')(board)
    for _ in range(conv_depth):
        previous = x
        x = layers.Conv2D(filters=conv_size, kernel_size=3,
                          padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.ReLU()(x)
        x = layers.Conv2D(filters=conv_size, kernel_size=3,
                          padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.Add()([x, previous])
        x = layers.ReLU()(x)

    # x = layers.Flatten()(x)
    # x = layers.Dense(1, 'sigmoid')(x)
    x = layers.Flatten(name="flatten")(x)
    x = layers.Dense(128, name="pre_last_dense")(x)
    x = layers.ReLU(name="last_ReLU_dense")(x)
    x = layers.Dropout(0.5, name="dropout")(x)
    x = layers.Dense(1, 'sigmoid')(x)

    return Model(inputs=board, outputs=x)


if CREATE:
    print("Creating dataset...")
    games_node = generate_games(GENERATED_GAME)
    games_evals = evaluate_game(games_node)
    x_train, y_train = create_dataset(games_node)
    np.save("./dataset/mancala_train", x_train)
    np.save("./dataset/mancala_target", y_train)
else:
    print("Importing dataset...")
    x_train = np.load("./dataset/mancala_train.npy")
    y_train = np.load("./dataset/mancala_target.npy")

x_train = np.array([arr.reshape(2, 7) for arr in x_train])
x_train = normalize(x_train, type=3, type_on=1)
# y_train = normalize(y_train, type=2)

if TRAIN:
    # model = mancala_model(32, 4)
    model = mancala_model_two()
    model.compile(optimizer=Adam(1e-3),
                  loss='mean_squared_error', metrics=['accuracy'])
    model.summary()
    history = model.fit(
        x_train, y_train,
        batch_size=BATCH_SIZE,
        epochs=EPOCHS,
        validation_split=0.1
    )

    model.save(f'./model/{FILE}')

    val_loss_curve = history.history["val_loss"]
    val_acc_curve = history.history["val_accuracy"]
    acc_curve = history.history["accuracy"]
    loss_curve = history.history["loss"]

    plt.style.use("ggplot")
    plt.figure()
    plt.plot(np.arange(0, EPOCHS), loss_curve, label="train_loss")
    plt.plot(np.arange(0, EPOCHS), val_loss_curve, label="val_loss")
    plt.plot(np.arange(0, EPOCHS), acc_curve, label="accuracy")
    plt.plot(np.arange(0, EPOCHS), val_acc_curve, label="val_accuracy")
    plt.title("Training Loss and Accuracy")
    plt.xlabel("Epoch #")
    plt.ylabel("Loss/Accuracy")
    plt.legend(loc="lower left")
    plt.savefig("plot.png")
    plt.show()
