import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import Board from './src/Board';
import ModeSelection from './src/ModeSelection';
import DifficultySelection from './src/DifficultySelection';
import { Audio } from 'expo-av';
import backgroundImage from './src/assets/red_background.png';

// get width and height to use in styles
const { width, height } = Dimensions.get('window');

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [winningSound, setWinningSound] = useState();
  const [losingSound, setLosingSound] = useState();
  const [tieSound, setTieSound] = useState();

  // load sounds
  useEffect(() => {
    async function loadSounds() {
      const { sound: winningSound } = await Audio.Sound.createAsync(require('./src/assets/winningSound.mp3'));
      const { sound: losingSound } = await Audio.Sound.createAsync(require('./src/assets/losingSound.mp3'));
      const { sound: tieSound } = await Audio.Sound.createAsync(require('./src/assets/tieSound.mp3'));
      setWinningSound(winningSound);
      setLosingSound(losingSound);
      setTieSound(tieSound);
    }
    loadSounds();

    return () => {
      if (winningSound) {
        winningSound.unloadAsync();
      }
      if (losingSound) {
        losingSound.unloadAsync();
      }
      if (tieSound) {
        tieSound.unloadAsync();
      }
    };
  }, []);

  // TODO explain
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // TODO explain
  function jumpToMove(moveIndex) {
    setHistory(history.slice(0, moveIndex + 1));
    setCurrentMove(moveIndex);
  }

  // TODO explain
  function handleModeSelect(selectedMode) {
    setMode(selectedMode);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    if (selectedMode === 'PvP') {
      setDifficulty(null); // difficulty set to null if PvP is chosen
    }
  }

  function handleDifficultySelect(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
  }

  // remove mode and difficulty when going back to mode selection
  function handleBackToModeSelection() {
    setMode(null);
    setDifficulty(null);
  }

  return (
    <View style={styles.container}>
      {/* Background for the entire app */}
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        {mode === null ? (
          // Show mode selection if mode is not selected
          <ModeSelection onSelectMode={handleModeSelect} />
        ) : mode === 'PvE' && difficulty === null ? (
          // Show difficulty selection if PvE is chosen
          <DifficultySelection onSelectDifficulty={handleDifficultySelect} onBack={handleBackToModeSelection} />
        ) : (
          <>
            {/* Container for upper buttons */}
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.backButton} onPress={handleBackToModeSelection}>
                <Image source={require('./src/assets/tictactoe_pirateLogo.jpeg')} style={{ width: 70, height: 70 }} />
              </Pressable>
              <Pressable style={styles.moves} onPress={() => {
                setHistory([Array(9).fill(null)]);
                setCurrentMove(0);
              }}>
                <Text style={styles.buttonText}>Start Over</Text>
              </Pressable>
            </View>
            {/* Container for board*/}
            <View style={styles.board}>
              <Board
                mode={mode === 'PvE' ? difficulty : mode}
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                winningSound={winningSound}
                losingSound={losingSound}
                tieSound={tieSound}
              />
            </View>
            {/* Container for moves history */}
            <View style={styles.moveHistory}>
              {history.map((move, index) => (
                <Pressable style={styles.historyMoves} key={index} onPress={() => jumpToMove(index)}>
                  <Text style={[styles.buttonText, { fontWeight: index === currentMove ? 'bold' : 'normal' }]}>
                    {index === 0 ? 'Go to game start' : `Go to move #${index}`}
                  </Text>
                </Pressable>
              ))}
            </View>

          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: "150%",
    width: "auto"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: -40,
    padding: 10,
    zIndex: 1, // Ensure buttons are above the board
  },
  moveHistory: {
    marginTop: -20,
    width: '85%', // Adjust width based on window width
    padding: 10,
    alignSelf: 'center',
    borderColor: '#ffb300',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#0549a5',
  },
  historyMoves: {
    textAlign: 'center',
  },
  moves: {
    borderColor: '#ffb300',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#0549a5',
    margin: 10,
    padding: 10,
  },
  backButton: {
    paddingLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  board: {
    width: width - 20, // 20 pixels less than screen width for padding
    height: height / 2, // Half of screen height - check if needs adjusting
    alignSelf: 'center',
  }
});
