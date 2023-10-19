import { View, Text, Pressable, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import apiObject from '../api/DBfirestore'
import DropSheds from '../components/DropSheds'
import CustomColors from '../stylus/colors'

const Delete = () => {

    const region = 'adepcoca'

    const [shed, setShed] = useState('')

    const addShed = (name) => {
        setShed(name)
    }

    const handleRemove = () => {
        Alert.alert('Remove The Shed', 'Are you sure?',
            [
                { text: 'Yes', onPress: () => apiObject.deleteShed(region, shed) },
                { text: 'No', onPress: () => console.log('cancel') }
            ])
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Shed</Text>

            <DropSheds addShed={addShed} />

            <TouchableOpacity style={styles.button} onPress={handleRemove}>
                <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomColors.white,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        color: CustomColors.primary,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: CustomColors.secondary,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: CustomColors.grey
    },
    text: {
        color: CustomColors.white,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Delete