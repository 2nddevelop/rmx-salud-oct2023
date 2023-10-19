import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors';

const Numbers = ({ number }) => {

    const val = String(number);
    // console.log(val.length)

    const contador = [];

    let validador = 4 - val.length
    // console.log(validador)
    let i = 0;

    if (val.length <= 4) {

        while (i < validador) {
            contador.push(0)
            i++;
        }

        for (let index = 0; index < val.length; index++) {
            const element = val[index];
            contador.push(element)
        }
    } else { }


    // console.log(contador)

    return (
        <View>
            <View style={styles.container}>
                {contador.map((num, index) => (
                    <Text style={styles.text} key={index}>{num}</Text>
                ))}
                <Text style={styles.simbolo}>Bs</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        backgroundColor: 'black',
        color: CustomColors.white,
        fontSize: 25,
        paddingHorizontal: 2,
        marginHorizontal: 2,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        textAlign: 'center',
        fontFamily: 'digital'
    },
    simbolo: {
        color: CustomColors.black,
        fontSize: 15,
        // fontFamily: 'roboto',
        // fontWeight: 'bold',
        marginLeft: 2,
    }
})

export default Numbers