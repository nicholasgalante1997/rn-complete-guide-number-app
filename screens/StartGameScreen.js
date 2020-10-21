import React from 'react';

import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

const StartGameScreen = () => {
    return ( 
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <View style={styles.inputContainer}>
                <Text>Enter a Number</Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <Button title="Reset" />
                    <Button title="Confirm" />
                </View>
            </View>
        </View>
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
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    }
})

export default StartGameScreen;