import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors'
import dataHorarios from '../data/rutas/horarios';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Rutas = () => {
    return (
        <ScrollView>
            <View style={styles.containerTip}>
                <Text style={styles.titleTip}>AVISO</Text>
                <View style={styles.article}>
                    <Text style={styles.textTip}>Listado de todos los HORARIOS de operaciones habilitados.</Text>
                </View>
            </View>

            { dataHorarios.map((item) => (
                <View key={item.rut_id}  style={styles.container}>
                    <Text style={styles.title}>{item.hor_codigo} - {item.hor_descripcion}</Text>
                    <View style={styles.article}>
                        <Text style={styles.text}>Corresponde de {item.hor_de} A {item.hor_a}</Text>
                    </View>
                    <Text style={styles.footer}>Publicado {item.hor_registrado}</Text>
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