import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOver = (props) => {
    return ( 
        <View style={styles.screen}>
            <TitleText>
                The Game is Over!
            </TitleText>
            <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/success.png')} 
            // source={
            //     {
            //         uri: 'https://images.squarespace-cdn.com/content/v1/5c60dfaf7d0c91662e150b0d/1568834065228-WTFWD0C9G5S5IUCJ6U7L/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/SUMMIT+EDIT.jpg?format=2500w',
            //         width: 300,
            //         height: 300,
            //     }
            // }
            style={styles.image}
            resizeMode='cover'
            />
            </View>
            <BodyText>
                Number of Rounds: {props.rounds}
            </BodyText>
            <BodyText>
                The number was {props.userNumber}
            </BodyText>
            {/* <Button title='New Game?'
            onPress={props.onRestart}/> */}
            <MainButton onPress={props.onRestart}>
                New Game?
            </MainButton>
        </View>
     );
}
 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
       width: '100%',
       height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden'
    }
})
export default GameOver;