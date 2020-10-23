import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [numberOfRounds, setNumberOfRounds] = useState(0)

  const configNewGameHandler = () => {
    setNumberOfRounds(0)
    setUserNumber(null)
  }

  const gameOverHandler = (guesses) => {
    setNumberOfRounds(guesses)
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if (userNumber && numberOfRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (numberOfRounds > 0){
    content = <GameOver rounds={numberOfRounds} userNumber={userNumber} 
    onRestart={configNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
