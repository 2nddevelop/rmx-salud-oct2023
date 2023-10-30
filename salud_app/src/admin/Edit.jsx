import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable, Modal, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import DropRegions from '../components/DropRegions'
import DropSheds from '../components/DropSheds'
import CustomColors from '../stylus/colors'
import apiObject from '../api/DBfirestore'
import { useNavigation } from '@react-navigation/native'

const Edit = () => {

    const navigation = useNavigation();

    const [region, setRegion] = useState('adepcoca')
    const [shed, setShed] = useState('arapata')

    const addRegion = (name) => {
        setRegion(name)
    }

    const addShed = (name) => {
        setShed(name)
    }

    const handleDates = () => {
        navigation.navigate('EditPrices', {region: region, shed: shed} )
    }
    
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Regions</Text>
            <DropRegions addRegion={addRegion} />

            <Text style={styles.title}>Sheds</Text>
            <DropSheds addShed={addShed} />

            <TouchableOpacity style={styles.button} onPress={handleDates}>
                <Text style={styles.text}>Search</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        color: CustomColors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: CustomColors.secondary,
        padding: 10,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: CustomColors.grey
    },
    text: {
        color: CustomColors.white,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default Edit