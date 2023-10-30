import { View, Text, Button, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import CustomColors from '../stylus/colors'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image
                    source={require('../assets/images/fot1.jpeg')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 20,
                        position: "absolute",
                        top: 10,
                        transform: [
                            { translateX: 20 },
                            { translateY: 50 },
                            { rotate: "-15deg" }
                        ]
                    }}
                />
                <Image
                    source={require("../assets/images/fot2.jpeg")}
                    style={{
                        height: 130,
                        width: 130,
                        borderRadius: 20,
                        position: "absolute",
                        top: -30,
                        left: 100,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "-5deg" }
                        ]
                    }}
                />
                <Image
                    source={require("../assets/images/fot3.jpeg")}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 20,
                        position: "absolute",
                        top: 150,
                        left: -30,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "15deg" }
                        ]
                    }}
                />
                <Image
                    source={require("../assets/images/fot4.jpeg")}
                    style={{
                        height: 180,
                        width: 200,
                        borderRadius: 20,
                        position: "absolute",
                        top: 100,
                        left: 100,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "-15deg" }
                        ]
                    }}
                />
            </View>

            <View style={{
                paddingHorizontal: 22,
                paddingVertical: 10,
                position: "absolute",
                //top: 380,
                bottom: 0,
                width: "100%",
                backgroundColor: CustomColors.quartery
            }}>
                <Text style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: CustomColors.secondary
                }}>La información es PODER</Text>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        color: CustomColors.white,
                        marginVertical: 4
                    }}>Conectese para recibir información sobre las rutas de recojo</Text>
                </View>

                <Pressable
                    style={styles.button2}
                    onPress={() => navigation.navigate("Signup")}
                    backgroundColor = '#FFF'
                >
                    <Text style={{
                        fontSize: 16,
                            fontWeight: "bold",
                        color: CustomColors.secondary
                    }}>Registrarse</Text>
                </Pressable>

                <View style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: CustomColors.white
                    }}>Si ya tiene una cuenta creada </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: CustomColors.white,
                            fontWeight: "bold",
                            marginLeft: 4
                        }}>INGRESAR</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: CustomColors.primary,
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: CustomColors.white,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Welcome