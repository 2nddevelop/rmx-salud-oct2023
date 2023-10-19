import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors'

const Law = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>REGLAMENTO</Text>
            <Text style={styles.title2}>CAPITULO I</Text>
            <Text style={styles.title2}>DISPOSICIONES GENERALES</Text>

            <View style={styles.article}>
                <Text style={styles.subtitle}>ARTICULO 1.(OBJETO)</Text>
                <Text style={styles.text}>La presente Ley tiene por objeto:</Text>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>a)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>b)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>c)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
            </View>

            <View style={styles.article}>
                <Text style={styles.subtitle}>ARTICULO 2.(FINALIDADES)</Text>
                <Text style={styles.text}>La presente Ley tiene las siguientes finalidades:</Text>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>a)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>b)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>c)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>d)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>e)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>f)</Text>
                    <Text style={styles.text}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum;</Text>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
        color: CustomColors.primary,
        fontSize: 20,
        fontWeight: 'bold'
    },
    title2: {
        textAlign: 'center',
        color: CustomColors.black,
        fontSize: 15,
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
    }
})

export default Law