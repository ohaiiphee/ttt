import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import CalculateWinner from './CalculateWinner';
import Square from './Square';
import ModalComponent from './ModalComponent';



const Board = ({ mode, xIsNext, squares, onPlay, winningSound, losingSound, tieSound }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showExtraButton, setShowExtraButton] = useState(mode === 'PvE_Medium');
    const [showImage, setShowImage] = useState(false);
    const [aiDifficulty, setAIDifficulty] = useState(mode);

    async function playSound(sound) {
        if (sound) {
            await sound.replayAsync();
        }
    }

    function handleClick(i) {
        // after every move, check if there is a winner or if square is filled already
        if (CalculateWinner.calculate(squares) || squares[i]) {
            // if yes, return without doing anything
            return;
        }
        // make copy of current squares state
        const nextSquares = squares.slice();
        // set clicked square to X or O 
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // update game state
        onPlay(nextSquares);
    }

    function makeAIMove(nextSquares) {
        let emptySquares = [];
        // iterate through squares to find empty squares
        nextSquares.forEach((square, index) => {
            if (!square) {
                emptySquares.push(index);
            }
        });

        let aiMove;
        // make move based on AI difficulty
        if (aiDifficulty === 'PvE_Easy') {
            aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        } else if (aiDifficulty === 'PvE_Medium') {
            aiMove = mediumDifficultyMove(nextSquares, emptySquares);
        } else if (aiDifficulty === 'PvE_Hard') {
            aiMove = hardDifficultyMove(nextSquares, emptySquares);
        }
        // set chosen square to O, update game state
        nextSquares[aiMove] = 'O';
        onPlay(nextSquares);
    }

    function mediumDifficultyMove(squares, emptySquares) {
        // try to find winning move
        for (let i = 0; i < emptySquares.length; i++) {
            let index = emptySquares[i];
            // simulate ai move
            squares[index] = 'O';
            // if its a winning move, return index to play it
            if (CalculateWinner.calculate(squares) === 'O') {
                return index;
            }
            // reset square before checking the next possibility
            squares[index] = null;
        }
        // if win not possible, try to block the player
        for (let i = 0; i < emptySquares.length; i++) {
            let index = emptySquares[i];
            // simulate player move
            squares[index] = 'X';
            // if player has a winning move, return index to block it
            if (CalculateWinner.calculate(squares) === 'X') {
                return index;
            }
            // reset square before checking the next possibility
            squares[index] = null;
        }
        // if neither win nor block is possible, make a random move
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    function hardDifficultyMove(squares, emptySquares) {
        let bestScore = -Infinity; // best score starts at negative infinity
        let bestMove;
        // iterate through empty squares to find best move
        for (let i = 0; i < emptySquares.length; i++) {
            let index = emptySquares[i];
            // simulate ai move
            squares[index] = 'O';
            // evaluate move using minmax algorithm
            let score = minmax(squares, 0, false);
            // undo move
            squares[index] = null;
            if (score > bestScore) {
                bestScore = score; // update best score
                bestMove = index; // update best move
            }
        }
        // return best move found after evaluating all possibilities
        return bestMove;
    }

    function minmax(squares, depth, isMaximizing) {
        let winner = CalculateWinner.calculate(squares);
        if (winner === 'O') {
            return 1;
        } else if (winner === 'X') {
            return -1;
        } else if (CalculateWinner.checkTie(squares)) {
            return 0;
        }
        // maximize for AI
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < squares.length; i++) {
                // if square is empty, simulate AI moves and choose the best move
                if (!squares[i]) {
                    squares[i] = 'O';
                    let score = minmax(squares, depth + 1, false);
                    squares[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else { // minimize for player
            let bestScore = Infinity;
            for (let i = 0; i < squares.length; i++) {
                // if square is empty, simulate human moves and choose the best move (for AI)
                if (!squares[i]) {
                    squares[i] = 'X';
                    let score = minmax(squares, depth + 1, true);
                    squares[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    const winner = CalculateWinner.calculate(squares);
    const isATie = CalculateWinner.checkTie(squares) && !winner;

    useEffect(() => {
        // check if there's a winner
        if (winner) {
            setModalMessage(`${winner} wins!`);
            setIsModalVisible(true);
            // play sound based on who won
            if (winner === 'X') {
                playSound(winningSound);
            } else if (winner === 'O') {
                playSound(losingSound);
            }
            // if it's a tie, show modal with tie message and play tie sound
        } else if (isATie) {
            setModalMessage('It\'s a tie!');
            setIsModalVisible(true);
            playSound(tieSound);
            // if the game is still ongoing, make AI move if it's AI's turn
        } else if (aiDifficulty !== 'PvP' && !xIsNext) {
            setTimeout(() => {
                const nextSquares = squares.slice();
                makeAIMove(nextSquares);
            }, 500); // delay for better user experience
        }
    }, [squares, aiDifficulty]);

    let playerStatus;
    // change "Next player" message based on who's turn it is
    if (!winner && !isATie) {
        playerStatus = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function handleModalClose() {
        setIsModalVisible(false);
    }

    function handleExtraButtonClick() {
        setShowImage(true); // Show Sanji's image
        setAIDifficulty('PvE_Easy'); // Set AI to Easy mode when weakness is used
    }

    return (
        <View style={styles.container}>
            <Text style={styles.status}>{playerStatus}</Text>
            <View style={styles.boardRow}>
                <Square value={squares[0]} onPress={() => handleClick(0)} />
                <Square value={squares[1]} onPress={() => handleClick(1)} />
                <Square value={squares[2]} onPress={() => handleClick(2)} />
            </View>
            <View style={styles.boardRow}>
                <Square value={squares[3]} onPress={() => handleClick(3)} />
                <Square value={squares[4]} onPress={() => handleClick(4)} />
                <Square value={squares[5]} onPress={() => handleClick(5)} />
            </View>
            <View style={styles.boardRow}>
                <Square value={squares[6]} onPress={() => handleClick(6)} />
                <Square value={squares[7]} onPress={() => handleClick(7)} />
                <Square value={squares[8]} onPress={() => handleClick(8)} />
            </View>
            {mode === 'PvE_Medium' && showExtraButton && (
                <Pressable style={styles.extraButton} onPress={handleExtraButtonClick}>
                    <Text style={styles.extraButtonText}>Use Sanji's Weakness</Text>
                </Pressable>
            )}
            {showImage && (
                <Pressable style={styles.imageOverlay} onPress={() => setShowImage(false)}>
                    <Image source={require('./assets/sanji_heart_eyes.png')} style={styles.image} />
                </Pressable>
            )}
            <ModalComponent isVisible={isModalVisible} message={modalMessage} onClose={handleModalClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    boardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    status: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    extraButton: {
        backgroundColor: '#00B9FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    extraButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageOverlay: {
        position: 'absolute',
        top: -80,
        left: 0,
        right: 0,
        bottom: -80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

// export component to use in other files
export default Board;
