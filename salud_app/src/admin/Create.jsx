import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native'
import React, { useState } from 'react'
import CustomColors from '../stylus/colors'
import apiObject from '../api/DBfirestore'
import { useNavigation } from '@react-navigation/native'


const Create = () => {

    const navigation = useNavigation();

    const region = 'adepcoca';

    const [state, setState] = useState({
        name: '',
        elegida_kl: '',
        hojeada_esp: '',
        hojeada: '',
        mediana_esp: '',
        mediana: '',
        comun: '',
        chimi: '',
        choqueta: '',
        view: false
    })

    const handleChanges = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const saveNewShed = () => {
        if (state.name === '') {
            Alert.alert('Please Provider a name')
        } else {
            apiObject.setShed(state, region);
            navigation.navigate('Manage')
        }
        // console.log(state)
    }

    return (
        <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>

            <View style={styles.container}>
                <Text style={styles.text1}>Galpon</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Galpon'
                    onChangeText={(value) => handleChanges('name', value)}
                    value={state.name}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Elegida Kl</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Elegida Especial'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('elegida_kl', value)}
                    value={state.elegida_kl}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Hojeada Especial</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Hojeada Especial'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('hojeada_esp', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Hojeada</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Hojeada'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('hojeada', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Mediana Especial</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Mediana Especial'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('mediana_esp', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Mediana</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Mediana'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('mediana', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Comun</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Comun'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('comun', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Chimi</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Chimi'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('chimi', value)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text1}>Choqueta</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Choqueta'
                    keyboardType='numeric'
                    onChangeText={(value) => handleChanges('choqueta', value)}
                />
            </View>
            <View style={styles.switch}>
                <Text style={styles.text1}>Preview</Text>
                <Switch
                    trackColor={{ false: CustomColors.grey, true: CustomColors.primary }}
                    onValueChange={(value) => handleChanges('view', value)}
                    value={state.view}
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={saveNewShed}
                >
                    <Text style={styles.text2}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        // flex: 1
    },
    input: {
        flex: 1,
        margin: 10,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: CustomColors.primary,
        borderRadius: 10,
        height: 40
    },
    switch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: CustomColors.secondary,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: CustomColors.grey
    },
    text1: {
        color: CustomColors.primary,
        fontSize: 15,
        fontWeight: 'bold'
    },
    text2: {
        color: CustomColors.white,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Create