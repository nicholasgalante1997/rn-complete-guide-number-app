import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton';

import { Ionicons } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNumber = Math.floor((Math.random() * (max - min))) + min;
    if (randomNumber === exclude) {
       return generateRandomBetween(min, max, exclude)
    } else {
        return randomNumber;
    }
}

const GameScreen = (props) => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert('Dont You Lie', "Im watching you.", [{text: "Sorry!", style: 'cancel'}])
            return;
        } 
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currentRound => currentRound + 1)
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>
                Opponent's Guess
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}> 
                {/* <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
                <Button title="HIGHER" onPress={() => nextGuessHandler('higher')} /> */}

                <MainButton onPress={() => nextGuessHandler('lower')}>
                   <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </View>
     );
}
 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "90%"
    }
})

export default GameScreen;