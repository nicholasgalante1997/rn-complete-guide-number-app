import React, {useState, useEffect} from 'react';
import {View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions} 
from 'react-native'

import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'


const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""))
    }

    const resetInputHandler = () => {
        setEnteredValue("")
        setConfirmed(false)
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber)|| chosenNumber <= 0 || chosenNumber > 99) {
            return Alert.alert("Invalid Number!", "Number has to be a number between one and ninety-nine.", [{text: 'Okay?', style: 'destructive', onPress: resetInputHandler }]);
        } 
        setConfirmed(true)
        setSelectedNumber(parseInt(chosenNumber))
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
            {/* <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)} /> */}
        </Card>
    }
    return ( 
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
                <BodyText>Enter a Number</BodyText>
                <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize="none" 
                autoCorrect={false} 
                keyboardType="numeric" 
                maxLength={2} 
                onChangeText={numberInputHandler}
                value={enteredValue} />
                <View style={styles.buttonContainer}>
                   <View style={{width: buttonWidth}}>
                       <Button title="Reset" color={Colors.accent} 
                       onPress={resetInputHandler}/>
                    </View> 
                   <View style={{width: buttonWidth}}>
                       <Button title="Confirm" color={Colors.primary}
                       onPress={confirmInputHandler} />
                    </View> 
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
     );
}
 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    inputContainer: {
        minWidth: 300,
        width: '80%',
        maxWidth: '95%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    // button: {
    //     // width: 100
    //     // width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen;