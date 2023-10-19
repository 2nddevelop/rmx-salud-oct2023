import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors';
import { useNavigation } from '@react-navigation/native';

const Manage = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={true}
                style={styles.buttonDesactive}
                onPress={() => { navigation.navigate('Create') }}
            >
                <Text style={styles.text}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={true}
                style={styles.buttonDesactive}
                onPress={() => { navigation.navigate('Delete') }}

            >
                <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
                // disabled={true}
                style={styles.buttonActive}
                onPress={() => { navigation.navigate('Edit') }}
            >
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    buttonActive: {
        margin: 20,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: CustomColors.secondary,
        borderWidth: 1,
        borderColor: CustomColors.grey
    },
    buttonDesactive: {
        margin: 20,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: CustomColors.grey,
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
});

export default Manage