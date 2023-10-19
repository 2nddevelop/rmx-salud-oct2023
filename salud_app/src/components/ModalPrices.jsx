import { View, Text, Modal, StyleSheet, TouchableOpacity, ImageBackground, Alert, Pressable } from 'react-native'
import React, { useState } from 'react';
import CustomColors from '../stylus/colors'
import Prices from './Prices'

const ModalPrices = ({ showInfo, setShowInfo, shed }) => {

    return (
        <>
            <Modal
                visible={showInfo}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setShowInfo(!setShowInfo)}
            >
                <Pressable
                    style={styles.modal}
                    onPressOut={() => setShowInfo(!setShowInfo)}
                >
                    <View style={styles.container}>
                        <View key={shed.id} style={styles.wrap}>
                            <ImageBackground
                                style={styles.image}
                                source={require('../assets/icons/hoja.png')}
                            >
                                <Text style={styles.text}>{shed.gp_descripcion}</Text>
                            </ImageBackground>
                        </View>
                        <Text style={styles.title}>Fecha {shed.reg_fecha?.substring(0, 10)}</Text>
                        <Prices prices={shed} />
                        {/* <TouchableOpacity
                            onPress={() => setShowInfo(!setShowInfo)}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.button_text}>Closed</Text>
                        </TouchableOpacity> */}
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: CustomColors.white,
        alignItems: 'center',
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        borderWidth: 1,
        borderColor: CustomColors.grey,

        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
  
    },
    image: {
        resizeMode: 'cover',
        height: 100,
        width: 300
    },
    text: {
        // position: 'absolute',
        left: '0%',
        top: '30%',
        color: CustomColors.white,
        fontSize: 25,
        fontWeight: 'bold',  
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CustomColors.primary,
    },
    button_text: {
        color: CustomColors.white,
        backgroundColor: CustomColors.primary,
        padding: 5,
        borderRadius: 7,
        elevation: 5
    }
})

export default ModalPrices