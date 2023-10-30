import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors'
import dataRutas from '../data/rutas/rutas';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Rutas = () => {
    return (
        <ScrollView>
            <View style={styles.containerTip}>
                <Text style={styles.titleTip}>AVISO</Text>
                <View style={styles.article}>
                    <Text style={styles.textTip}>Listado de todas las RUTAS habilitadas con el horario de operacion asignado.</Text>
                </View>
            </View>

            { dataRutas.map((item) => (
                <View key={item.rut_id}  style={styles.container}>
                    <Text style={styles.title}>{item.rut_codigo}</Text>
                    <View style={styles.article}>
                        <Text style={styles.text}>{item.rut_descripcion}</Text>
                        <Text style={styles.text}>La ruta es operativa de {item.hor_de} A {item.hor_a}</Text>
                    </View>
                    <Text style={styles.footer}>Publicado {item.rut_registrado}</Text>
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
        padding: 10, margin:10, backgroundColor: CustomColors.terciary, borderRadius: 10,
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

export default Rutas