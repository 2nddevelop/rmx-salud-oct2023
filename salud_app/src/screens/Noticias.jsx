import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors'
import dataNoticias from '../data/noticias';

const region = 'sacaba';

const Noticias = () => {
    return (
        <ScrollView>
            <View style={styles.containerTip}>
                <Text style={styles.titleTip}>AVISO</Text>
                <View style={styles.article}>
                    <Text style={styles.textTip}>Noticias de interes publicadas.</Text>
                </View>
            </View>

            { dataNoticias.map((item) => (
                <View key={item.nt_id} style={styles.container}>
                    <Text style={styles.title}>{item.nt_titulo}</Text>
                    <View style={styles.article}>
                        <Text style={styles.text}>{item.nt_contenido}</Text>
                    </View>
                    <Text style={styles.footer}> Publicado {item.nt_registrado}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10, margin:10, backgroundColor: 'lightgray', borderRadius: 10,
    },
    containerTip: {
        padding: 10, margin:10, backgroundColor: CustomColors.secondary, borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        color: CustomColors.primary,
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleTip: {
        textAlign: 'center',
        color: CustomColors.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    article: {
        marginTop: 10
    },
    subtitle: {
        color: CustomColors.black,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 5
    },
    section: {
        flexDirection: 'row'
    },
    text: {
        marginBottom: 5,
        paddingRight: 5
    },
    textTip: {
        color: CustomColors.white,
        marginBottom: 5,
        paddingRight: 5
    },
    footer: {
        fontSize: 9, fontStyle: 'italic'
    }
})

export default Noticias