import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert, ScrollView, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText'

import { Ionicons } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'


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

const renderListItem = (value, numOfRounds) => {
    return <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRounds}</BodyText>
            <BodyText>{value}</BodyText>
            </View>
}

const GameScreen = (props) => {

    // locking a specific screen
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses])
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
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: "90%"
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
})

export default GameScreen;